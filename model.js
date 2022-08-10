const userSchema = require("./schemas/User");
const itemSchema = require("./schemas/Item");

// User Routes

exports.getUserId = async (req, res) => {
  const singleUser = await userSchema.findById(req.params.userId);
  res.status(200).send(singleUser);
};

// exports.patchUserName = (req, res) => {
//   const updateUserName = userSchema.updateOne(
//     { _id: req.params.userId },
//     { $set: { name: req.body.name } }
//   );
//   res.status(200).send(updateUserName);
// };

// exports.patchUserCharity = (req, res) => {
//   const updateUserCharity = userSchema.updateOne(
//     { _id: req.params.userId },
//     { $set: { charity: req.body.charity } }
//   );
//   res.status(200).send(updateUserCharity);
// };

exports.getAllUsers = async (req, res) => {
  const allUsers = await userSchema.find();
  res.status(200).send(allUsers);
};

// Item Routes

exports.getSingleItem = async (req, res) => {
  const singleItem = await itemSchema.findById(req.params.itemId);
  res.status(200).send(singleItem);
};

exports.getAllItems = async (req, res) => {
  const allItems = await itemSchema.find();
  res.status(200).send(allItems);
};

exports.postItem = async (req, res) => {
  const item = new itemSchema({
    itemname: req.body.itemname,
    itemlocation: req.body.itemlocation,
    itemcategory: req.body.itemcategory,
    itemowner: req.body.itemowner,
    itemimgurl: req.body.itemimgurl,
  });
  const newItem = await item.save();
  res.status(201).send(newItem);
};

// {
//     "itemname": "Golden Prada dress size M",
//     "itemlocation": "M205TG",
//     "itemcategory": "clothing",
//     "itemowner": "Kate Bush",
//     "itemimgurl":
//       "https://a.1stdibscdn.com/prada-gold-metallic-leather-dress-fairytale-for-sale/1121189/v_80933021574347855196/8093302_master.jpg"
//     }
