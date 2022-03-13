const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userName: {
      type: String,
      unique: true
    },
    emailAddress: {
      type: String,
      unique: true
    },
    accountNumber: {
      type: Number,
      unique: true
    },
    identityNumber: {
      type: Number,
      unique: true
    },
    password: String
  })
);

module.exports = User;
