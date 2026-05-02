const { z } = require("zod");

// Record validation
exports.recordSchema = z.object({
  patientId: z.string(),
  diagnosis: z.string().min(1),
  notes: z.string().min(1)
});

// Appointment validation
exports.appointmentSchema = z.object({
  doctorId: z.string(),
  patientId: z.string(),
  startTime: z.string(),
  endTime: z.string()
});