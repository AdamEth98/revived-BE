const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new mongoose.Schema({
  itemname: String,
  itemlocation: String,
  itemcategory: String,
  itemowner: String,
  claimed: { type: Boolean, default: false },
  itemcreateddate: { type: Date, default: Date.now },
  itemimgurl: String,
});

module.exports = mongoose.model("items", itemSchema);
