const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

// #region Creating new coupon
router.post("/", async (req, res) => {
  try {
    const coupon = req.body;
    const { code } = coupon.code;
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ error: "This coupon is already exist." });
    }

    const newCoupon = new Coupon(coupon);
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log("Creating coupon error:", error);
    res.status(500).json({ error: "Server error!" });
  }
});
//#endregion

// #region Getting all coupons
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
// #endregion

// #region Getting coupon according to id
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found!" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Getting coupon according to coupon code
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found!" });
    }
    res.status(200).json({ discountPercent });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Updating coupon
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updateBody = req.body;

    const existingCoupon = await Coupon.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "Coupon not found!" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateBody, {
      new: true,
    });

    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Deleting coupon
router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const existingCoupon = await Coupon.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "Product not found!" });
    }

    await Coupon.findByIdAndDelete(couponId);

    res.status(200).json({ message: "Deleting is successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion
module.exports = router;
