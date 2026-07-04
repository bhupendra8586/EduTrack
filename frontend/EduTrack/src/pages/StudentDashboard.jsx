import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("");


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    API.get("/student/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) return <h2 className="text-white p-10">Loading...</h2>;

  const { student, assignments, marks } = data;

  const previewAssignments = assignments.slice(0, 3);
  const previewMarks = marks.slice(0, 3);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <button
          onClick={handleLogout}
          className="mt-6 mb-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Logout
        </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Profile</h2>
          <p>Email: {student.email}</p>
          <p>Department: {student.department}</p>
          <p>Contact: {student.contact}</p>
          <p>Address: {student.address}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Quick Access</h2>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveTab("attendance")}
              className="bg-blue-500 py-2 rounded"
            >
              Attendance
            </button>

            <button
              onClick={() => setActiveTab("marks")}
              className="bg-purple-500 py-2 rounded"
            >
              Marks
            </button>

            <button
              onClick={() => setActiveTab("assignments")}
              className="bg-yellow-500 py-2 rounded"
            >
              Assignments
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Info</h2>
          <p>Use quick access to view details</p>
        </div>

      </div>

      {activeTab && (
        <div className="mt-6 bg-gray-900 p-6 rounded-2xl">

          {activeTab === "attendance" && (
            <>
              <h2 className="text-xl mb-4">Attendance</h2>

              {student.attendance?.map((a, i) => (
                <div key={i} className="mb-3">
                  <p>Sem {a.semester}</p>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${a.percentage}%` }}
                    ></div>
                  </div>
                  <p>{a.percentage}%</p>
                </div>
              ))}
            </>
          )}

          {activeTab === "marks" && (
            <>
              <h2 className="text-xl mb-4">All Marks</h2>

              {marks.map((m) => (
                <p key={m._id}>
                  {m.subject} - {m.marks}
                </p>
              ))}
            </>
          )}

          {activeTab === "assignments" && (
            <>
              <h2 className="text-xl mb-4">All Assignments</h2>

              {assignments.map((a) => (
                <div key={a._id} className="mb-3">
                  <p className="font-bold">{a.title}</p>
                  <p className="text-sm text-gray-400">
                    {a.description}
                  </p>
                </div>
              ))}
            </>
          )}

        </div>
      )}

      {/* preview--sectionn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* Marks*/}
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Marks Preview</h2>

          {previewMarks.length > 0 ? (
            previewMarks.map((m) => (
              <p key={m._id}>
                {m.subject} - {m.marks}
              </p>
            ))
          ) : (
            <p>No marks available</p>
          )}
        </div>

        {/* Assignment */}
        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Assignments Preview</h2>

          {previewAssignments.length > 0 ? (
            previewAssignments.map((a) => (
              <p key={a._id}>{a.title}</p>
            ))
          ) : (
            <p>No assignments available</p>
          )}
        </div>

      </div>

    </div>
  );
}