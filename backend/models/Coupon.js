const mongoose = require("mongoose");
const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", CouponSchema);

module.exports = Coupon;
