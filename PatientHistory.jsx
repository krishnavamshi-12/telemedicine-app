import { useState } from "react";
import { getPatientRecords } from "../api";

function PatientHistory() {
  const [patientId, setPatientId] = useState("");
  const [records, setRecords] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await getPatientRecords(patientId);
      setRecords(res.data);
    } catch (error) {
      alert("Unable to fetch records ❌");
    }
  };

  return (
    <div className="card">
      <h2>📜 Previous Patient Records</h2>

      <input
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />

      <button onClick={fetchHistory}>Search</button>

      {records.map((record) => (
        <div
          key={record._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px"
          }}
        >
          <strong>Diagnosis:</strong> {record.diagnosis}
          <br />
          <strong>Notes:</strong> {record.notes}
          <br />
          <strong>Date:</strong>{" "}
          {new Date(record.createdAt).toLocaleString()}
        </div>
      ))}
    </div>
  );
}

export default PatientHistory;