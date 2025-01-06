const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const BlogSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    reviews: [ReviewSchema],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
