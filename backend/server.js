const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const PORT = 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req, res) => {
  res.send("Hello Express.js");
});
app.get("/api", (req, res) => {
  res.send("En buyuk Fener");
});

app.listen(PORT, () => {
  connect();
  console.log(`The server is running ${5000} `);
});
