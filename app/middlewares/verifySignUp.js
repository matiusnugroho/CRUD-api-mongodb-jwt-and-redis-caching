const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    userName: req.body.userName
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({success: false, message: err });
      return;
    }

    if (user) {
      res.status(400).send({success: false, message: "Username is taken!" });
      return;
    }

    // Email
    User.findOne({
      emailAddress: req.body.emailAddress
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({success: false, message: err });
        return;
      }

      if (user) {
        res.status(400).send({success: false, message: "Email is registered by another account!" });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
