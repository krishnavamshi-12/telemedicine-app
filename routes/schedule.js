const router = require("express").Router();
const DoctorSchedule = require("../models/DoctorSchedule");
const auth = require("../middleware/auth");

// ✅ Set schedule
router.post("/", auth, async (req, res) => {
  try {
    const { doctorId, dayOfWeek, startTime, endTime } = req.body;

    const schedule = new DoctorSchedule({
      doctorId,
      dayOfWeek,
      startTime,
      endTime
    });

    await schedule.save();

    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ message: "Error saving schedule" });
  }
});

module.exports = router;