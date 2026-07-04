import { useState } from "react";
import API from "../../api/api";

export default function Marks({ studentId }) {
  const [data, setData] = useState({
    subject: "",
    marks: "",
    semester: ""
  });

  const handleSubmit = async () => {
    try {
      await API.post("/marks/add", {
        ...data,
        studentId
      });
      alert("Marks added");
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Subject"
        onChange={(e) =>
          setData({ ...data, subject: e.target.value })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Marks"
        onChange={(e) =>
          setData({ ...data, marks: e.target.value })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Semester"
        onChange={(e) =>
          setData({ ...data, semester: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Add Marks
      </button>
    </div>
  );
}