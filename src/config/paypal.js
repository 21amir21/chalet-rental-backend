const axios = require("axios");

const generateAccessToken = async () => {
  const response = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
  });

  return response.data.access_token;
};

module.exports.createOrder = async (chaletTitle, chaletDesc, totalPrice) => {
  const accessToken = await generateAccessToken();

  const response = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          items: [
            {
              name: chaletTitle, // TODO: should make it the chalet name or label or whatever
              description: chaletDesc, // TODO: should make it the chalet desc or label or whatever
              quantity: 1,
              unit_amount: {
                currency_code: "USD",
                value: totalPrice.toString(), // // TODO: should make it the price
              },
            },
          ],

          amount: {
            currency_code: "USD",
            value: totalPrice.toString(), // TODO: should make it the chalet desc or label or whatever
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalPrice.toString(), // TODO: should make it the chalet desc or label or whatever
              },
            },
          },
        },
      ],

      // for the buyer (customer)
      application_context: {
        return_url: process.env.FRONTEND_BASE_URL + "/payments/complete", // TODO: hanshof fy el frontend hatb2a ezay
        cancel_url: process.env.FRONTEND_BASE_URL + "/", // TODO: hanshof fy el frontend hatb2a ezay
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        brand_name: "PAZAS", // TODO: the name of our website
      },
    }),
  });

  return response.data.links.find((link) => link.rel === "approve").href;
  // return response.data.id;
};

module.exports.capturePayment = async (orderId) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Request-Id": `capture-${orderId}`, // Idempotency key
      },
    });

    return response.data;
  } catch (err) {
    console.error(
      "Error capturing payment: ",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
};
