const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  patientId: String,
  doctorId: String,
  medicines: String
});

module.exports = mongoose.model("Prescription", schema);