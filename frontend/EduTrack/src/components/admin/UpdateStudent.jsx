import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    department: "",
    contact: "",
    totalFees: "",
    paidFees: ""
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const fetchStudent = async () => {
    try {

      const res = await axios.get(
        `http://localhost:7878/admin/students/${id}`,
        { withCredentials: true }
      );

      const data = res.data;

      setStudent({
        name: data.name,
        email: data.email,
        department: data.department,
        contact: data.contact,
        totalFees: data.fees?.total,
        paidFees: data.fees?.paid
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const updatedStudent = {
        name: student.name,
        email: student.email,
        department: student.department,
        contact: student.contact,

        fees: {
          total: Number(student.totalFees),
          paid: Number(student.paidFees),
          due: Number(student.totalFees) - Number(student.paidFees)
        }
      };

      await axios.put(
        `http://localhost:7878/admin/students/${id}`, ////this is error
        updatedStudent,
        { withCredentials: true }
      );

      navigate("/admin/students");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">

      <div className="bg-gray-900 border border-gray-700 p-10 rounded-xl w-full max-w-3xl text-white">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Update Student
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-gray-300 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
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
              value={student.email}
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
              value={student.department}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Contact</label>
            <input
              type="text"
              name="contact"
              value={student.contact}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Total Fees</label>
            <input
              type="number"
              name="totalFees"
              value={student.totalFees}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Paid Fees</label>
            <input
              type="number"
              name="paidFees"
              value={student.paidFees}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div className="col-span-2">

            <div className="text-red-400 mb-4">
              Due Fees: ₹{student.totalFees - student.paidFees || 0}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
            >
              Update Student
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UpdateStudent;