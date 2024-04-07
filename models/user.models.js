const mongoose = require("mongoose");

const user = mongoose.model(
  "user",
  mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      default: "Web Developer",
    },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],

    profilePic: {
      type: String,
      default: "https://cdn-icons-png.freepik.com/256/1077/1077114.png",
    },
  })
);

module.exports = user;
