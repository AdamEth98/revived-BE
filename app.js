const express = require("express");
const { default: mongoose } = require("mongoose");
const userSchema = require("./schemas/User");
require("dotenv").config();
const db = require("./utils/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
//require("./utils/passportConfig")(passportConfig);

const {
  getUserId,
  patchUserName,
  patchUserCharity,
  getSingleItem,
  getAllItems,
  getAllUsers,
  postItem,
  patchItemName,
  patchItemLocation,
} = require("./model");

// auth requires
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./utils/passportConfig");
const LocalStrategy = require("passport-local").Strategy;

// app settings
const app = express();
const port = process.env.PORT || 3000;

// Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  passportConfig.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

app.post("/api/register", (req, res) => {
  userSchema.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) {
      console.log(err);
      throw err;
    }
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

app.get("/", (req, res) => {
  res.send("hello");
});

// User Routes

app.get("/users/:userId", getUserId);

app.patch("/users/:userId", patchUserName);

app.patch("/users/:userId", patchUserCharity);

app.get("/users", getAllUsers);

// Item Routes

app.get("/items/:itemId", getSingleItem);

app.get("/items", getAllItems);

app.post("/items", postItem);

app.patch("/items/:itemId", patchItemName);

app.patch("/items/:itemId", patchItemLocation);

module.exports = app;
