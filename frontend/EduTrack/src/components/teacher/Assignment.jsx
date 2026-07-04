import { useState } from "react";
import API from "../../api/api";

export default function Assignment() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: ""
  });

  const handleSubmit = async () => {
    try {
      await API.post("/assignment/create", form);
      alert("Assignment created");
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Subject"
        onChange={(e) =>
          setForm({ ...form, subject: e.target.value })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="date"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, dueDate: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </div>
  );
}