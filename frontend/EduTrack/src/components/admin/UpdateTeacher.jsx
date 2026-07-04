import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function UpdateTeacher() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
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

  const fetchTeacher = async () => {
    try {

      const res = await axios.get(
        `http://localhost:7878/admin/teachers/${id}`,
        { withCredentials: true }
      );

      const data = res.data;

      setTeacher({
        name: data.name,
        email: data.email,
        employeeId: data.employeeId,
        department: data.department,
        year: data.year,
        subjectAssigned: data.subjectAssigned || [{ semester: "", subject: "" }]
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:7878/admin/teachers/${id}`,
        teacher,
        { withCredentials: true }
      );

      toast.success("Teacher Data Updated Successfully");
      navigate("/admin/teachers");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">

      <div className="bg-gray-900 border border-gray-700 p-10 rounded-xl w-full max-w-3xl text-white">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Update Teacher
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-gray-300 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={teacher.employeeId}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Department</label>
            <input
              type="text"
              name="department"
              value={teacher.department}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Year</label>
            <input
              type="text"
              name="year"
              value={teacher.year}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div className="col-span-2">

            <label className="text-gray-300 text-sm">Subject Assignment</label>

            {teacher.subjectAssigned.map((sub, index) => (
              <div key={index} className="flex gap-4 mt-2">

                <input
                  type="text"
                  name="subject"
                  value={sub.subject}
                  placeholder="Subject"
                  onChange={(e) => handleSubjectChange(index, e)}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg"
                />

                <input
                  type="number"
                  name="semester"
                  value={sub.semester}
                  placeholder="Semester"
                  onChange={(e) => handleSubjectChange(index, e)}
                  className="w-40 p-3 bg-black border border-gray-700 rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removeSubject(index)}
                  className="bg-red-600 px-4 rounded-lg"
                >
                  X
                </button>

              </div>
            ))}

            <button
              type="button"
              onClick={addSubject}
              className="mt-3 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
            >
              + Add Subject
            </button>

          </div>

          <div className="col-span-2">

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
            >
              Update Teacher
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UpdateTeacher;