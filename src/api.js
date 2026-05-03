const BASE = "http://localhost:5000";

// Create EHR Record
export const createRecord = async (data) => {
  try {
    const res = await fetch(BASE + "/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return res.json();
  } catch (err) {
    console.log("Error:", err);
    alert("Backend not running ❌");
  }
};

// Book Appointment
export const bookAppointment = async (data) => {
  try {
    const res = await fetch(BASE + "/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return res;
  } catch (err) {
    console.log("Error:", err);
    alert("Backend not running ❌");
  }
};