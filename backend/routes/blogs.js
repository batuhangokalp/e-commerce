const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog.js");

// #region Creating blog
router.post("/", async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
// #endregion

// #region Getting all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
// #endregion

// #region Getting blog according to id
router.get("/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found!" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Updating Blog
router.put("/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const updateBody = req.body;

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found!" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateBody, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Deleting Blog
router.delete("/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found!" });
    }

    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ message: "Deleting is successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

module.exports = router;
