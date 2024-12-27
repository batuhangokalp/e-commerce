const express = require("express");
const router = express.Router();

// Diger rota dosyalarını ice aktar.
const categoryRoute = require("./categories.js");
const authRoute = require("./auth.js");
const productRoute = require("./products.js");
const couponRoute = require("./coupon.js");

// Her rotayı ilgili yol altında kullanıyoruz.
router.use("/categories", categoryRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/coupons", couponRoute);




module.exports = router;