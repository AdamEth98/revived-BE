const express = require("express");
const { default: mongoose } = require("mongoose");
const userSchema = require("./schemas/User");
require("dotenv").config();
const db = require("./utils/db");

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
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
