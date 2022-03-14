const db = require("../models");
const redis = require('redis');
//const dbConfig = require("../config/db.config");

const client = redis.createClient();
client.connect();
const User = db.user;

exports.getAll = async(req, res) => {
  const users = await client.get('users');
  let data;
  if(users){
    data = {source:"cache",data:JSON.parse(users)}
  }
  else{
    const users = await User.find();
    data = {source:"server",data:users};
    client.set('users',JSON.stringify(users));
    client.expire('users',10);
  }
  res.send(data);
}
exports.getByIdentityNumber = async(req, res) => {
  const user = await User.findOne({
    identityNumber: req.params.identityNumber
  });
  data = {success:true,user};
  res.json(data);
    
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