const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new mongoose.Schema({
  itemname: { type: String, required: true },
  itemlocation: { type: String, required: true },
  itemcategory: { type: String, required: true },
  itemowner: String,
  claimed: { type: Boolean, default: false },
  itemcreateddate: { type: Date, default: Date.now },
  itemimgurl: [{ type: Schema.Types.ObjectId, ref: "images" }],
});

module.exports = mongoose.model("items", itemSchema);

// {
//   "itemname": "shoes",
//   "itemlocation": "D973TY",
//   "itemcategory": "clothing",
//   "itemowner": "QWERTY",
//   "itemimgurl":
//     "PICTURE OF SHOES"
//   }
