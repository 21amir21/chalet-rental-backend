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

// module.exports.createOrder = async (chaletTitle, chaletDesc, totalPrice) => {
//   const accessToken = await generateAccessToken();
//   try {
//     const response = await axios({
//       url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       data: JSON.stringify({
//         intent: "CAPTURE",
//         purchase_units: [
//           {
//             items: [
//               {
//                 name: chaletTitle,
//                 description: chaletDesc,
//                 quantity: 1,
//                 unit_amount: {
//                   currency_code: "USD",
//                   value: totalPrice.toString(),
//                 },
//               },
//             ],

//             amount: {
//               currency_code: "USD",
//               value: totalPrice.toString(),
//               breakdown: {
//                 item_total: {
//                   currency_code: "USD",
//                   value: totalPrice.toString(),
//                 },
//               },
//             },
//           },
//         ],

//         // for the buyer (customer)
//         application_context: {
//           return_url: process.env.FRONTEND_BASE_URL + "/payments/complete",
//           cancel_url: process.env.FRONTEND_BASE_URL + "/",
//           shipping_preference: "NO_SHIPPING",
//           user_action: "PAY_NOW",
//           brand_name: "PAZAS",
//         },
//       }),
//     });

//     return response.data.links.find((link) => link.rel === "approve").href;
//   } catch (err) {
//     console.error(`Fyy Error hnaaa: ${err}`);
//   }
// };

module.exports.createOrder = async (chaletTitle, chaletDesc, totalPrice) => {
  const accessToken = await generateAccessToken();

  // Log the access token
  console.log("Access Token:", accessToken);

  // Prepare the payload data
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: chaletTitle || "Default Chalet Name", // Fallback if undefined
            description: chaletDesc || "Default Description", // Fallback if undefined
            quantity: "1", // Ensure quantity is a string
            unit_amount: {
              currency_code: "USD",
              value: parseFloat(totalPrice).toFixed(2), // Two decimal places
            },
          },
        ],
        amount: {
          currency_code: "USD",
          value: parseFloat(totalPrice).toFixed(2), // Match the sum of unit_amount values
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: parseFloat(totalPrice).toFixed(2),
            },
          },
        },
      },
    ],
    application_context: {
      return_url: `${process.env.FRONTEND_BASE_URL}/payments/complete`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/`,
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
      brand_name: "PAZAS",
    },
  };

  // Log the payload data
  console.log("Payload Data:", JSON.stringify(payload, null, 2));

  // Make the request
  const response = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: payload,
  });

  const approvalLink = response.data.links.find(
    (link) => link.rel === "approve"
  );
  if (!approvalLink) {
    throw new Error("Approval link not found in PayPal response.");
  }

  return approvalLink.href;
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
