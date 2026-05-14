const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

exports.generatePrescription = async (req, res) => {

  const {
    patientName,
    doctorName,
    medicines
  } = req.body;

  const doc = new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  doc.pipe(res);

  doc.fontSize(25).text(
    "Medical Prescription",
    {
      align: "center"
    }
  );

  doc.moveDown();

  doc.fontSize(16).text(
    `Patient: ${patientName}`
  );

  doc.text(
    `Doctor: ${doctorName}`
  );

  doc.moveDown();

  doc.text("Medicines:");

  medicines.forEach((med, index) => {
    doc.text(
      `${index + 1}. ${med}`
    );
  });

  const qrData = await QRCode.toDataURL(
    `Prescription for ${patientName}`
  );

  doc.image(qrData, {
    fit: [100, 100],
    align: "center"
  });

  doc.end();
};