const express = require("express");
const router = express.Router();

// Getting all items
router.get("/", async (req, res) => {
  res.send("Products were got");
});


module.exports = router;