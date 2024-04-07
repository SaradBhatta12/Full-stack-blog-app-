require("dotenv").config();
const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const connectDB = require("./connectdb");
const initilizationPassport = require("./authentication");
const isauth = require("./middleware");
const user = require("./models/user.models");
const ejs = require("ejs");
const flash = require("connect-flash");
const upload = require("./multer/multer");
const uploadImage = require("./utils/cloudinery");
const post = require("./models/post.models");
const commentmodel = require("./models/comment.models");
const app = express();

// middlewares==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "skskskskks",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());

//db connections with db
connectDB();

//use of passport js
initilizationPassport(passport, localStrategy);

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/feed", isauth, async (req, res) => {
  const Posts = await post.find().populate("user");

  res.render("feed", { Posts });
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const User = await user.findOne({ username });

  if (User) {
    res.status(201).json({ message: "user already exists" });
  } else {
    const newUser = user.create({ username, password, email });
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  const errorMessage = req.flash("error")[0];
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {}
);

app.get("/", isauth, async (req, res) => {
  let user = req.user;

  let posts = await post.find({ user }).populate("user");
  res.render("home", { user, posts });
});

app.post("/upload", isauth, upload.single("file"), async (req, res) => {
  try {
    let User = req.user;
    let { caption } = req.body;
    const uploadedImage = await uploadImage(req.file.path);

    if (req.file) {
      let newPost = await post.create({
        caption,
        image: uploadedImage.url,
        user: User.id,
      });
      await newPost.save();
      return res.redirect("/");
    }
  } catch (error) {
    console.log("unable to upload file on cloudinary " + error);
    res.redirect("/");
  }
});

app.get("/editprofile", (req, res) => {
  res.render("editprofile");
});

app.post("/editprofile", isauth, upload.single("image"), async (req, res) => {
  try {
    let User = req.user;
    let { name, profession } = req.body;
    if (req.file) {
      const uploadedImage = await uploadImage(req.file.path);
      User.profilePic = uploadedImage.url;
      User.username = name;
      User.profession = profession;
      await User.save();
    }
    return res.redirect("/");
  } catch (error) {
    console.log("unable to upload file on cloudinary " + error);
    res.redirect("/editprofile");
  }
});

app.get("/deletepost/:id", isauth, async (req, res) => {
  try {
    let { id } = req.params;
    await post.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (error) {
    console.log("unable to delete your post " + error);
    return res.redirect("/");
  }
});

app.post("/comment/:postId", isauth, async (req, res) => {
  let { comment } = req.body;
  let postid = req.params.postId;
  let yourPost = await post.findById(postid);
  let User = req.user.id;

  let cmnt = await commentmodel.create({
    comment,
    post: postid,
    user: User,
  });

  let newPost = await yourPost.comments.push(cmnt._id);
  await yourPost.save();

  return res.redirect("/feed");
});

app.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      req.flash("error", error + "something went wrong");
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/newpost", (req, res) => {
  res.render("newpost");
});
app.listen(process.env.port, () => {
  console.log("server is working in port no " + process.env.port);
});
