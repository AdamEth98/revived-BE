const express = require("express");
const { default: mongoose } = require("mongoose");
const userSchema = require("./schemas/User");
require("dotenv").config();
const db = require("./utils/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const upload = require("./utils/upload");

const {
  getUserId,
  patchUser,
  getSingleItem,
  getAllItems,
  getAllUsers,
  postItem,
  patchItem,
  deleteItem,
  uploadImage,
} = require("./model");

// auth requires
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
require("./utils/passportConfig")(passport);

// app settings
const app = express();

// Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://revive-be.herokuapp.com/",
    credentials: true,
  })
);
// auth settings
app.use(cookieParser(process.env.AUTH_SECRET));
app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//LogIn/SignUp Routes

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(404).send("No User Exists");
    else
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(user._id);
      });
  })(req, res, next);
});

app.post("/api/register", (req, res) => {
  userSchema.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.get("/api/user", (req, res) => {
  res.send(req.user);
});

// Home Page

app.get("/", (req, res) => {
  res.send("hello");
});

// User Routes

app.get("/api/users", getAllUsers);

app.get("/api/users/:userId", getUserId);

app.patch("/api/users/:userId", patchUser);

// Item Routes

app.get("/api/items/:itemId", getSingleItem);

app.get("/api/items", getAllItems);

app.post("/api/users/:userId/items", upload.single("itemimage"), postItem);

app.patch("/api/items/:itemId", patchItem);

app.delete("/api/items/:itemId", deleteItem);

module.exports = app;
