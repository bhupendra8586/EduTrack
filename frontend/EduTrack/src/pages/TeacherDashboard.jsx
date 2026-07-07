import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("students");

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: ""
  });

  const [attendance, setAttendance] = useState({});
  const [attendanceHistory, setAttendanceHistory] = useState({});
  const [marks, setMarks] = useState({});



  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };




  const fetchStudents = async () => {
    try {
      const res = await API.get("/teacher/students");
      setStudents(res.data.students);
      res.data.students.forEach((student) => {
  fetchAttendance(student._id);
});
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAttendance = async (studentId) => {
  try {
    const res = await API.get(`/attendance/student/${studentId}`);

    setAttendanceHistory((prev) => ({
      ...prev,
      [studentId]: res.data.attendance
    }));

  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
  const load = async () => {
    await fetchStudents();
  };

  load();
}, []);

  const createAssignment = async () => {
    try {
      await API.post("/assignment/create", assignment);
      alert("Assignment given to all students");
    } catch (err) {
      console.log(err);
    }
  };

  const submitAttendance = async (studentId) => {
    try {
      await API.post("/attendance/mark", {
        studentId,
        date: new Date(),
        status: attendance[studentId] || "present"
      });
      await fetchAttendance(studentId);
alert("Attendance saved");
    } catch (err) {
      console.log(err);
    }
  };

  const submitMarks = async (studentId) => {
    try {
      await API.post("/marks/add", {
        studentId,
        subject: marks[studentId]?.subject,
        marks: marks[studentId]?.marks,
        semester: marks[studentId]?.semester
      });
      alert("Marks added");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">

      <div className="w-64 bg-gray-900 border-r border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-blue-500 mb-10">
          Teacher Panel
        </h1>

        <div className="space-y-3">
          <button
            onClick={() => setActiveTab("students")}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Students
          </button>

          <button
            onClick={() => setActiveTab("assignment")}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Assignment
          </button>

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-10">


        {activeTab === "students" && (
          <>
            <h2 className="text-3xl font-semibold mb-6">
              Students
            </h2>

            {students.map((s) => (
              <div
                key={s._id}
                className="bg-gray-900 border border-gray-700 p-5 mb-5 rounded-xl"
              >
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-gray-400">{s.email}</p>


                <div className="mt-3 flex gap-2">
                  <select
                    onChange={(e) =>
                      setAttendance({
                        ...attendance,
                        [s._id]: e.target.value
                      })
                    }
                    className="bg-gray-800 border border-gray-700 p-1 rounded"
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>

                  <button
                    onClick={() => submitAttendance(s._id)}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>


                {/* Attendance History */}
<div className="mt-4 border-t border-gray-700 pt-3">
  <h4 className="font-semibold text-blue-400 mb-2">
    Attendance History
  </h4>

  {attendanceHistory[s._id]?.length > 0 ? (
    attendanceHistory[s._id].map((a) => (
      <div
        key={a._id}
        className="flex justify-between items-center py-1 text-sm border-b border-gray-800"
      >
        <span>
          {new Date(a.date).toLocaleDateString()}
        </span>

        <span
          className={`font-semibold ${
            a.status === "present"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {a.status.toUpperCase()}
        </span>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-sm">
      No attendance records found.
    </p>
  )}
</div>


                <div className="mt-3 flex gap-2 flex-wrap">
                  <input
                    placeholder="Subject"
                    className="bg-gray-800 border border-gray-700 p-1 rounded"
                    onChange={(e) =>
                      setMarks({
                        ...marks,
                        [s._id]: {
                          ...marks[s._id],
                          subject: e.target.value
                        }
                      })
                    }
                  />

                  <input
                    placeholder="Marks"
                    className="bg-gray-800 border border-gray-700 p-1 rounded"
                    onChange={(e) =>
                      setMarks({
                        ...marks,
                        [s._id]: {
                          ...marks[s._id],
                          marks: e.target.value
                        }
                      })
                    }
                  />

                  <input
                    placeholder="Sem"
                    className="bg-gray-800 border border-gray-700 p-1 rounded"
                    onChange={(e) =>
                      setMarks({
                        ...marks,
                        [s._id]: {
                          ...marks[s._id],
                          semester: e.target.value
                        }
                      })
                    }
                  />

                  <button
                    onClick={() => submitMarks(s._id)}
                    className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </>
        )}


        {activeTab === "assignment" && (
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl w-1/2">
            <h2 className="text-xl font-semibold mb-4">
              Create Assignment (All Students)
            </h2>

            <input
              placeholder="Title"
              className="bg-gray-800 border border-gray-700 p-2 w-full mb-2 rounded"
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />

            <input
              placeholder="Subject"
              className="bg-gray-800 border border-gray-700 p-2 w-full mb-2 rounded"
              onChange={(e) =>
                setAssignment({ ...assignment, subject: e.target.value })
              }
            />

            <input
              placeholder="Description"
              className="bg-gray-800 border border-gray-700 p-2 w-full mb-2 rounded"
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  description: e.target.value
                })
              }
            />

            <input
              type="date"
              className="bg-gray-800 border border-gray-700 p-2 w-full mb-2 rounded"
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  dueDate: e.target.value
                })
              }
            />

            <button
              onClick={createAssignment}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
            >
              Assign to Class
            </button>
          </div>
        )}

      </div>
    </div>
  );
}