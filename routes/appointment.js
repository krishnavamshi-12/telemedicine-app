const router = require("express").Router();
const Appointment = require("../models/Appointment");
const { appointmentSchema } = require("../utils/validation");

// ✅ Book Appointment
router.post("/", async (req, res) => {
  try {
    const result = appointmentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const { doctorId, patientId, startTime, endTime, reason } = req.body;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return res.status(400).json({ message: "Invalid time range" });
    }

    // 🔥 Overlap check
    const conflict = await Appointment.findOne({
      doctorId,
      startTime: { $lt: end },
      endTime: { $gt: start }
    });

    if (conflict) {
      return res.status(400).json({ message: "Time slot not available" });
    }

    const appt = new Appointment({
      doctorId,
      patientId,
      startTime: start,
      endTime: end,
      reason
    });

    await appt.save();

    res.status(201).json(appt);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;