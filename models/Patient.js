const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  history: String
});

module.exports = mongoose.model("Patient", schema);