const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: String,
  action: String,
  ip: String,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", schema);