const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: String,
  patientId: String,
  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model("Appointment", appointmentSchema);