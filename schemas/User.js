const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  items: [],
  charity: String,
});

module.exports = mongoose.model("users", userSchema);
