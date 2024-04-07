const flash = require("connect-flash");
const user = require("./models/user.models");
const isauth = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = isauth;
