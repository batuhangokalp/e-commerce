const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

// #region Creating new category
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log("Creating category error:", error);
  }
});
//#endregion

// #region Getting all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Getting category error:", error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//#endregion

// #region Getting category according to id
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) {
      // 676d65b8990446855c37ba26 id formatı bu şekilde olmalı, olmazsa direkt server errora atıyor. Mongo DB formatı ile alakalı.
      return res.status(404).json({ error: "Category not found!" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.log("Getting category error:", error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//#endregion

// #region Updating category
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updateBody = req.body;

    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found!" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateBody,
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log("Getting category error:", error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//#endregion

// #region Deleting category
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found!" });
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "Deleting is successful!" });
  } catch (error) {
    console.log("Getting category error:", error);
    res.status(500).json({ error: "Server Error!" });
  }
});
//#endregion
module.exports = router;
