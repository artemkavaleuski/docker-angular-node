const mongoose = require('mongoose');


const Dummy = new mongoose.Schema({
  text: String,
});

const Dummies = mongoose.model("Dummy", Dummy);

module.exports = Dummies