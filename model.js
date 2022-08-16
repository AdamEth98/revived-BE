const userSchema = require("./schemas/User");
const itemSchema = require("./schemas/Item");
const messageSchema = require("./schemas/message");

// User Routes

exports.getAllUsers = async (req, res) => {
  const allUsers = await userSchema.find();
  res.status(200).send(allUsers);
};

exports.getUserId = async (req, res) => {
  const singleUser = await userSchema.findById(req.params.userId);
  res.status(200).send(singleUser);
};

exports.patchUser = async (req, res) => {
  const updateUserBody = req.body;
  const updateUser = await userSchema.updateOne(
    { _id: req.params.userId },
    { $set: updateUserBody }
  );
  res.status(200).send(updateUser);
};

exports.postAvatar = async (req, res) => {
  const updateUser = await userSchema.updateOne(
    { _id: req.params.userId },
    { $set: { avatar: req.file.link } }
  );
  res.status(200).send(updateUser);
};

exports.deleteUser = async (req, res) => {
  const removeUser = await userSchema.deleteOne({ _id: req.params.userId });
  res.status(204).send(removeUser);
};

// Item Routes

exports.getSingleItem = async (req, res) => {
  const singleItem = await itemSchema.findById(req.params.itemId);
  //.populate("items");
  res.status(200).send(singleItem);
};

exports.getAllItems = async (req, res) => {
  const allItems = await itemSchema.find();
  res.status(200).send(allItems);
};

exports.getAllItems = async (req, res) => {
  const category = req.query.category;
  if (category) {
    const query = await itemSchema.find({ itemcategory: category });
    res.status(200).send(query);
  } else {
    const allItems = await itemSchema.find();
    res.status(200).send(allItems);
  }
};

exports.getAllUserItems = async (req, res) => {
  const allUserItems = await itemSchema.find({
    itemownerid: req.params.userId,
  });
  res.status(200).send(allUserItems);
};

exports.postItem = async (req, res) => {
  const userId = req.params.userId;

  await userSchema
    .findById(userId)
    .then((result) => {
      return result.name;
    })
    .then((name) => {
      const item = new itemSchema({
        itemname: req.body.itemname,
        itemlocation: req.body.itemlocation,
        itemcategory: req.body.itemcategory,
        itemdescription: req.body.itemdescription,
        itemowner: name,
        itemownerid: userId,
        itemimgurl: req.file.link,
      });
      return item.save();
    })
    .then((result) => {
      userSchema.findByIdAndUpdate(
        userId,
        { $push: { items: result._id } },
        { new: true, useFindAndModify: false }
      );
      res.status(201).send(result);
    });
};

exports.patchItem = async (req, res) => {
  const updateItemBody = req.body;
  const updateItem = await itemSchema.updateOne(
    { _id: req.params.itemId },
    { $set: updateItemBody }
  );
  res.status(200).send(updateItem);
};

exports.deleteItem = async (req, res) => {
  const removeItem = await itemSchema.deleteOne({ _id: req.params.itemId });
  res.status(204).send(removeItem);
};

// Message Routes

exports.getAllDBMessages = async (req, res) => {
  const allMessages = await messageSchema.find();
  res.status(200).send(allMessages);
};

exports.getMessages = async (req, res) => {
  const { from, to } = req.body;

  const messages = await messageSchema
    .find({
      users: {
        $all: [from, to],
      },
    })
    .sort({ updatedAt: 1 });

  const projectedMessages = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    };
  });
  res.send(projectedMessages);
};

exports.postMessage = async (req, res) => {
  const { from, to, message } = req.body;
  const data = await messageSchema.create({
    message: { text: message },
    users: [from, to],
    sender: from,
  });

  if (data) return res.send({ msg: "Message added successfully." });
  else return res.send({ msg: "Failed to add message to the database" });
};
