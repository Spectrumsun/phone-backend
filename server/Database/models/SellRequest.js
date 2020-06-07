import mongoose from "mongoose";


const sellRequestSchema = new mongoose.Schema(
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

sellRequestSchema.index({
  phone_name: "text",
  storage: "text",
  condition: "text",
});


module.exports = mongoose.model("SellRequest", sellRequestSchema);
