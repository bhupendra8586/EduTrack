import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function ManageStudents() {

  const navigate = useNavigate()

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {

      const res = await axios.get(
        "https://edutrack-backend-vb35.onrender.com/admin/students",
        { withCredentials: true }
      );

      setStudents(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {

      await axios.delete(
        `https://edutrack-backend-vb35.onrender.com/admin/students/${id}`,
        { withCredentials: true }
      );

      fetchStudents();

    } catch (error) {
      console.log(error);
    }
  };

  // Search filter
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Manage Students
        </h1>

        <div className="flex gap-4">


          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-lg text-white focus:outline-none"
          />

          <button
            onClick={() => navigate("/admin/students/add")}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Add Student
          </button>

        </div>

      </div>


      <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-800">

            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Department</th>
              <th className="p-4">Contact</th>
              {/* <th className="p-4">Attendance</th> */}
              <th className="p-4">Year</th>
              <th className="p-4">Fees</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student) => (

              <tr
                key={student._id}
                className="border-t border-gray-700 hover:bg-gray-800"
              >

                <td className="p-4">{student.name}</td>
                <td className="p-4">{student.email}</td>
                <td className="p-4">{student.department}</td>
                <td className="p-4">{student.contact}</td>

                {/* <td className="p-4">

                  {student.attendance?.map((a, index) => (
                    <div key={index}>
                      Sem {a.semester}: {a.percentage}%
                    </div>
                  ))}

                </td> */}

                <td className="p-4">
                  {student.yearId?.name}
                </td>

                <td className="p-4">

                  <div>Total: ₹{student.fees?.total}</div>
                  <div>Paid: ₹{student.fees?.paid}</div>
                  <div className="text-red-400">
                    Due: ₹{student.fees?.due}
                  </div>

                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() => navigate(`/admin/students/${student._id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStudent(student._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageStudents;