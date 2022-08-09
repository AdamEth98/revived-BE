const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  items: [],
  charity: String,
  rating: 0,
});

module.exports = userSchema;
