const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const generateRandomAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 71);
  const randomAvatar = `https://i.pravatar.cc/150?img=${randomNumber}`;
  return randomAvatar;
};

// #region Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already exist." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: generateRandomAvatar(),
    });

    // newUser.role = "admin";
    // Eğer User.Create yaparsak yine kaydediyor.
    // Daha sonra newUser.role = "admin"; bu özelliği yazdığımızda db'e kaydetmiyor.
    // Save ile yaparsak db'e kaydediyor. Yani save ile daha sonra değişiklik yapılabiliyor.
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

// #region Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});
// #endregion

module.exports = router;
