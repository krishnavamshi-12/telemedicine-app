const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  patientId: String,
  diagnosis: String,
  prescription: String
});

module.exports = mongoose.model("Record", recordSchema);