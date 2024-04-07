const mongoose = require("mongoose");

const post = mongoose.model(
  "post",
  mongoose.Schema(
    {
      caption: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = post;
