const mongoose = require('mongoose');


const User = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Users = mongoose.model("User", User);

module.exports = Users