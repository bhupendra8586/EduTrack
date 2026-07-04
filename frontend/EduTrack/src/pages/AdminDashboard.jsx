import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {

  const navigate = useNavigate();

  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);

  const fetchCounts = async () => {
    try {

      const students = await axios.get(
        "http://localhost:7878/admin/students",
        { withCredentials: true }
      );

      const teachers = await axios.get(
        "http://localhost:7878/admin/teachers",
        { withCredentials: true }
      );

      setStudentsCount(students.data.length);
      setTeachersCount(teachers.data.length);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:7878/auth/logout",
      {},
      { withCredentials: true }
    );

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">

      <div className="w-64 bg-gray-900 border-r border-gray-700 p-6">

        <h1 className="text-2xl font-bold text-blue-500 mb-10">
          Admin Dashboard
        </h1>

        <nav className="flex flex-col gap-4">

          <button
            onClick={() => navigate("/admin/students")}
            className="text-left px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Manage Students
          </button>

          <button
            onClick={() => navigate("/admin/teachers")}
            className="text-left px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Manage Teachers
          </button>

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Logout
          </button>

        </nav>
      </div>

      <div className="flex-1 p-10">

        <h2 className="text-3xl font-semibold mb-10">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">

            <p className="text-gray-400">
              Total Students
            </p>

            <h3 className="text-4xl font-bold mt-2">
              {studentsCount}
            </h3>

          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">

            <p className="text-gray-400">
              Total Teachers
            </p>

            <h3 className="text-4xl font-bold mt-2">
              {teachersCount}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;