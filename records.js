const router = require("express").Router();
const Record = require("../models/Record");
const { encrypt } = require("../utils/encryption");
const { recordSchema } = require("../utils/validation");

router.post("/", async (req,res)=>{

  // ✅ Validate input
  const result = recordSchema.safeParse(req.body);
  if(!result.success){
    return res.status(400).json(result.error);
  }

  const record = new Record({
    patientId: req.body.patientId,
    diagnosis: encrypt(req.body.diagnosis),
    notes: encrypt(req.body.notes)
  });

  await record.save();
  res.json(record);
});

module.exports = router;