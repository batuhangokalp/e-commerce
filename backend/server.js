const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("morgan");
const app = express();
const mainRoute = require("./routes/index.js");
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

// middlewares
app.use(express.json());
app.use(logger("dev"));

app.use("/api", mainRoute);

app.listen(PORT, () => {
  connect();
  console.log(`The server is running ${5000} `);
});
