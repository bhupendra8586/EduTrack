import { useState } from "react";
import API from "../../api/api";

export default function Attendance({ studentId }) {
  const [status, setStatus] = useState("present");

  const handleSubmit = async () => {
    try {
      await API.post("/attendance/mark", {
        studentId,
        date: new Date(),
        status
      });
      alert("Attendance marked");
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="mt-3">
      <select
        className="border p-2 mr-2"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}