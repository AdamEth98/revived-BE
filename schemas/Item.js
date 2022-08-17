const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new mongoose.Schema({
  itemname: { type: String, required: true },
  itemlocation: { type: String, required: true },
  itemcategory: String,
  itemdescription: { type: String, default: "" },
  itemowner: String,
  itemownerid: { type: mongoose.Schema.Types.ObjectId, ref: "itemownerid" },
  claimed: { type: Boolean, default: false },
  itemcreateddate: { type: Date, default: Date.now },
  itemimgurl: { type: String },
});

module.exports = mongoose.model("items", itemSchema);
