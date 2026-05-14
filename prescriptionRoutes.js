const express = require("express");

const router = express.Router();

const {
  generatePrescription
} = require("../controllers/prescriptionController");

router.post(
  "/generate",
  generatePrescription
);

module.exports = router;