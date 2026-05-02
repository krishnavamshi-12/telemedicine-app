const AuditLog = require("../models/AuditLog");

module.exports = async (req, res, next) => {
  try {
    await AuditLog.create({
      userId: req.headers.userid || "guest",
      action: req.method + " " + req.originalUrl,
      ip: req.ip
    });
  } catch (err) {
    console.log("Audit error:", err);
  }

  next();
};