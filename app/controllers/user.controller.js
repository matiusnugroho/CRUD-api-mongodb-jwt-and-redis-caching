const db = require("../models");
const User = db.user;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getAll = async(req, res) => {
  const user = await User.find();
  data = {status:'success',user};
  res.json(data);
};