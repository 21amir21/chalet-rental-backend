const { Schema, model } = require("mongoose");

const chaletSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: String }],
    likes: {
      type: Number,
      default: 0,
    },
    comment: [{ type: String }],
    availability: { type: Boolean, default: true },
    description: { type: String },
    price: { type: Number, required: true },
    imagesPaths: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Chalet = model("Chalet", chaletSchema);

module.exports = Chalet;
