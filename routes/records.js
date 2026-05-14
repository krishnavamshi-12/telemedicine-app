const router = require("express").Router();
const Record = require("../models/Record");
const { encrypt } = require("../utils/encryption");
const { recordSchema } = require("../utils/validation");
const auth = require("../middleware/auth");

// ✅ Create Record Route
router.post("/", auth, async (req, res) => {
  try {
    // ✅ Validate input
    const result = recordSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    // ✅ Create new record
    const record = new Record({
      patientId: req.body.patientId,
      diagnosis: encrypt(req.body.diagnosis),
      notes: encrypt(req.body.notes),
    });

    await record.save();

    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;