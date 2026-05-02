const router = require("express").Router();
const Appointment = require("../models/Appointment");
const { appointmentSchema } = require("../utils/validation");

router.post("/", async (req,res)=>{

  // ✅ Validate input
  const result = appointmentSchema.safeParse(req.body);
  if(!result.success){
    return res.status(400).json(result.error);
  }

  const { doctorId, startTime, endTime } = req.body;

  // ✅ Convert to Date
  const start = new Date(startTime);
  const end = new Date(endTime);

  // 🔥 OVERLAP CHECK (CORE LOGIC)
  const conflict = await Appointment.findOne({
    doctorId,
    $or: [
      {
        startTime: { $lt: end },
        endTime: { $gt: start }
      }
    ]
  });

  if(conflict){
    return res.status(400).send("Time slot not available");
  }

  const appt = new Appointment({
    ...req.body,
    startTime: start,
    endTime: end
  });

  await appt.save();

  res.json(appt);
});

module.exports = router;