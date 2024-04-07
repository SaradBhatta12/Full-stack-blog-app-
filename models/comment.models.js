const mongoose = require("mongoose");
const user = require("./user.models");

const comment = mongoose.model(
  "comment",
  mongoose.Schema({
    comment: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  })
);

module.exports = comment;
