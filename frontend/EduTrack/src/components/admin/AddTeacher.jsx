import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddTeacher() {

  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
    department: "",
    year: "",
    subjectAssigned: [{ semester: "", subject: "" }]
  });

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value
    });
  };

  const handleSubjectChange = (index, e) => {
    const values = [...teacher.subjectAssigned];
    values[index][e.target.name] = e.target.value;

    setTeacher({
      ...teacher,
      subjectAssigned: values
    });
  };

  const addSubject = () => {
    setTeacher({
      ...teacher,
      subjectAssigned: [
        ...teacher.subjectAssigned,
        { semester: "", subject: "" }
      ]
    });
  };

  const removeSubject = (index) => {
    const values = [...teacher.subjectAssigned];
    values.splice(index, 1);

    setTeacher({
      ...teacher,
      subjectAssigned: values
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:7878/admin/teachers/add",
        teacher,
        { withCredentials: true }
      );

      toast.success("Teacher Added Successfully");

      navigate("/admin/teachers");

    } catch (error) {
      console.log(error);
      toast.error("Failed to add teacher");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">

      <div className="bg-zinc-900 p-10 rounded-xl shadow-xl w-full max-w-4xl border border-zinc-700">

        <h1 className="text-3xl font-semibold text-white mb-2">
          Add Teacher
        </h1>

        <p className="text-gray-400 mb-8">
          Enter teacher details to register them in the system.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-gray-300 text-sm">Teacher Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Department</label>
            <input
              type="text"
              name="department"
              placeholder="Department"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Year</label>
            <input
              type="text"
              name="year"
              placeholder="Year"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="col-span-2">
            <label className="text-gray-300 text-sm">Subject Assignment</label>

            {teacher.subjectAssigned.map((sub, index) => (
              <div key={index} className="flex gap-4 mt-2">

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={sub.subject}
                  onChange={(e) => handleSubjectChange(index, e)}
                  className="w-full p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />

                <input
                  type="number"
                  name="semester"
                  placeholder="Semester"
                  value={sub.semester}
                  onChange={(e) => handleSubjectChange(index, e)}
                  className="w-40 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                />

                <button
                  type="button"
                  onClick={() => removeSubject(index)}
                  className="bg-red-600 px-4 rounded-lg text-white"
                >
                  X
                </button>

              </div>
            ))}

            <button
              type="button"
              onClick={addSubject}
              className="mt-3 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white"
            >
              + Add Subject
            </button>

          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Add Teacher
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AddTeacher;