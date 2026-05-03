import { useState } from "react";
import { createRecord, bookAppointment } from "./api";
import "./App.css";

function App() {

  const [record, setRecord] = useState({
    patientId: "",
    diagnosis: "",
    notes: ""
  });

  const [appt, setAppt] = useState({
    patientId: "",
    doctorId: "",
    startTime: "",
    endTime: ""
  });

  const saveRecord = async () => {
    await createRecord(record);
    alert("Record saved ✅");
  };

  const bookAppt = async () => {
    const res = await bookAppointment(appt);

    if(res?.status === 400){
      alert("Slot not available ❌");
    } else {
      alert("Appointment booked ✅");
    }
  };

  return (
    <div className="container">

      <h1 className="title">🏥 Telemedicine EHR Dashboard</h1>

      <div className="grid">

        {/* EHR FORM */}
        <div className="card">
          <h2>📋 Medical Record</h2>

          <input placeholder="Patient ID"
            onChange={e=>setRecord({...record, patientId:e.target.value})} />

          <input placeholder="Diagnosis"
            onChange={e=>setRecord({...record, diagnosis:e.target.value})} />

          <textarea placeholder="Notes"
            onChange={e=>setRecord({...record, notes:e.target.value})} />

          <button onClick={saveRecord}>Save Record</button>
        </div>

        {/* APPOINTMENT FORM */}
        <div className="card">
          <h2>📅 Book Appointment</h2>

          <input placeholder="Patient ID"
            onChange={e=>setAppt({...appt, patientId:e.target.value})} />

          <input placeholder="Doctor ID"
            onChange={e=>setAppt({...appt, doctorId:e.target.value})} />

          <input type="datetime-local"
            onChange={e=>setAppt({...appt, startTime:e.target.value})} />

          <input type="datetime-local"
            onChange={e=>setAppt({...appt, endTime:e.target.value})} />

          <button onClick={bookAppt}>Book Appointment</button>
        </div>

      </div>
    </div>
  );
}

export default App;
