const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// #region Creating product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
// #endregion

// #region Getting all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
// #endregion

// #region Getting product according to id
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Updating product
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updateBody = req.body;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found!" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateBody,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Deleting product
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found!" });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Deleting is successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Searching product according to name
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

module.exports = router;
