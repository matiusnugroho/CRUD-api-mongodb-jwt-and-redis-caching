const db = require("../models");
const User = db.user;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getAll = async(req, res) => {
  const user = await User.find();
  data = {success:true,user};
  res.json(data);
};
exports.getByIdentityNumber = (req, res) => {
  User.findOne({
    identityNumber: req.params.identityNumber
  }).exec((err, user) => {
    let data;
    if(err){
      data = {
        success : false,
        message : err,
      }
      res.send(data);
      return;
    }
    data = {
      success : true,
      user
    };
    res.send(data);
  })
    
}
exports.getByAccountNumber = (req, res) => {
  User.findOne({
    accountNumber: req.params.accountNumber
  }).exec((err, user) => {
    let data;
    if(err){
      data = {
        success : false,
        message : err,
      }
      res.send(data);
      return;
    }
    data = {
      success : true,
      user
    };
    res.send(data);
  })
};