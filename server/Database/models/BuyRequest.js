import mongoose from "mongoose";


const buyRequestSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    phone_name: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    lock_status: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

buyRequestSchema.index({
  phone_name: "text",
  storage: "text",
  condition: "text",
});


module.exports = mongoose.model("BuyRequest", buyRequestSchema);
