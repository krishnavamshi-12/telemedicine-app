const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String
});

module.exports = mongoose.model("Doctor", schema);