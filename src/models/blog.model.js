const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: { type: String, required: true },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    labels: [{ type: String, required: true }],
    publish: { type: Boolean, default: false },
    likesCount: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("blogs", BlogSchema);
