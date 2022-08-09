const express = require("express");
const { default: mongoose } = require("mongoose");
const userSchema = require("./schemas/User");
require("dotenv").config();
const db = require("./utils/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
require("./utils/passportConfig")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// auth requires
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

// app settings
const app = express();
const port = process.env.PORT || 3000;

// auth settings
app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.AUTH_SECRET));
app.use(passport.initialize());
app.use(passport.session());

//LogIn/SignUp Routes
app.post("api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
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

app.post("api/register", (req, res) => {
  userSchema.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new userSchema({
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

// User Routes

app.get("api/users/:userId", (req, res) => {
  const singleUser = userSchema.findById(req.params.userId);
  res.send(singleUser);
});

app.patch("api/users/:userId", (req, res) => {
  const updateUser = userSchema.updateOne(
    { _id: req.params.userId },
    { $set: { name: req.body.name } }
  );
  res.send(updateUser);
});

//Listen
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
