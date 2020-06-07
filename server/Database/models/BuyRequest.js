import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

buyRequestSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("BuyRequest", buyRequestSchema);
