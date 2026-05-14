const router = require("express").Router();
const Appointment = require("../models/Appointment");
const DoctorSchedule = require("../models/DoctorSchedule");

// ✅ Generate slots
function generateSlots(start, end, interval = 30) {
  const slots = [];

  let [sh, sm] = start.split(":").map(Number);
  let [eh, em] = end.split(":").map(Number);

  let current = new Date();
  current.setHours(sh, sm, 0, 0);

  const finish = new Date();
  finish.setHours(eh, em, 0, 0);

  while (current < finish) {
    const s = new Date(current);
    current.setMinutes(current.getMinutes() + interval);
    const e = new Date(current);

    const fmt = (d) => d.toTimeString().slice(0, 5);

    slots.push(`${fmt(s)}-${fmt(e)}`);
  }

  return slots;
}

// ✅ Get available slots
router.get("/:doctorId/:date", async (req, res) => {
  try {
    const { doctorId, date } = req.params;

    const day = new Date(date).getDay();

    const schedule = await DoctorSchedule.findOne({
      doctorId,
      dayOfWeek: day
    });

    if (!schedule) {
      return res.status(400).json({ message: "Doctor not available" });
    }

    const allSlots = generateSlots(
      schedule.startTime,
      schedule.endTime,
      30
    );

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctorId,
      startTime: { $gte: startOfDay, $lte: endOfDay }
    });

    const booked = appointments.map(a => {
      const f = (d) => new Date(d).toTimeString().slice(0, 5);
      return `${f(a.startTime)}-${f(a.endTime)}`;
    });

    const available = allSlots.filter(s => !booked.includes(s));

    res.json({
      doctorId,
      date,
      availableSlots: available
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;