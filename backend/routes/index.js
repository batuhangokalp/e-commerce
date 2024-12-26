const express = require("express");
const router = express.Router();

// Diger rota dosyalarını ice aktar.
const productRouter = require("./products.js");
const categoryRouter = require("./categories.js");

// Her rotayı ilgili yol altında kullanıyoruz.
router.use("/products", productRouter);
router.use("/categories", categoryRouter);


module.exports = router;