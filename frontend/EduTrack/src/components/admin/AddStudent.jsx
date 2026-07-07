import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddStudent() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    department: "",
    year: "",
    semester: "",
    percentage: "",
    totalFees: "",
    paidFees: ""
  });

  const [years, setYears] = useState([]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7878/year",
        { withCredentials: true }
      );

      setYears(res.data.years);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const newStudent = {
        name: student.name,
        email: student.email,
        password: student.password,
        address: student.address,
        contact: student.contact,
        department: student.department,
        year: student.year,
        fees: {
          total: Number(student.totalFees),
          paid: Number(student.paidFees),
          due: Number(student.totalFees) - Number(student.paidFees)
        }
      };

      await axios.post(
        "http://localhost:7878/admin/students/add",
        newStudent,
        { withCredentials: true }
      );
      toast.success("Student Added Successfully");

      navigate("/admin/students");




    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">

      <div className="bg-zinc-900 p-10 rounded-xl shadow-xl w-full max-w-4xl border border-zinc-700">

        <h1 className="text-3xl font-semibold text-white mb-2">
          Add Student
        </h1>

        <p className="text-gray-400 mb-8">
          Enter student details to register them in the system.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm">Student Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Department */}
          <div>
            <label className="text-gray-300 text-sm">Department</label>
            <select
              name="department"
              value={student.department}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value="">Select Department</option>
              <option value="CS">CS</option>
              <option value="CSE">CSE</option>
              <option value="AIDS">AIDS</option>
              <option value="IT">IT</option>
              <option value="ENTC">ENTC</option>
              <option value="EE">EE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <div>
            <label className="text-gray-300 text-sm">Year</label>

            <select
              name="year"
              value={student.year}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value="">Select Year</option>

              {years
                .filter((y) => y.department === student.department)
                .map((y) => (
                  <option key={y._id} value={y.name}>
                    {y.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="text-gray-300 text-sm">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-gray-300 text-sm">Phone Number</label>
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Semester */}
          <div>
            <label className="text-gray-300 text-sm">Semester</label>
            <input
              type="text"
              name="semester"
              placeholder="Semester"
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Total Fees */}
          <div>
            <label className="text-gray-300 text-sm">Total Fees</label>
            <input
              type="number"
              name="totalFees"
              placeholder="Total Fees"
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Paid Fees */}
          <div>
            <label className="text-gray-300 text-sm">Paid Fees</label>
            <input
              type="number"
              name="paidFees"
              placeholder="Paid Fees"
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Button */}
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Add Student
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

export default AddStudent;