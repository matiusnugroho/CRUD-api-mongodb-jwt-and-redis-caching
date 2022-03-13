const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

exports.register = (req, res) => {
  const user = new User({
    Id: id,
    userName: req.body.userName,
    accountNumber: req.body.accountNumber,
    identityNumber: req.body.identityNumber,
    emailAddress: req.body.emailAddress,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({success:false, message: err });
      return;
    }
    res.send({ success: true, message: "User was registered successfully!",user});
  });
};

exports.login = (req, res) => {
  User.findOne({
    userName: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ success: false, message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          success: false, 
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        success: true, 
        user,
        accessToken: token
      });
    });
};
