const Record = require("../models/Record");

exports.getRecordsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await Record.find({ patientId }).sort({ createdAt: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};