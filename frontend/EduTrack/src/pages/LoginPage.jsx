import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password, role };

      const res = await axios.post(
        "http://localhost:7878/auth/login",
        user,
        { withCredentials: true }
      );

      console.log("RESPONSE: ", res);
      console.log("ROLE: ", res.data.user.role);
      if (res.data.user.role == "admin") navigate("/admin_dashboard");
      if (res.data.user.role == "teacher") navigate("/teacher_dashboard");
      if (res.data.user.role == "student") navigate("/student_dashboard");
      toast.success("Account login successful");

      setEmail("");
      setPassword("");

    } catch (error) {
      console.log("Login error:", error);

      // backend message
      const msg = error.response?.data?.message || "Login failed";

      toast.error(msg);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-800 flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Login
        </h2>

        <p className="text-zinc-400 text-center mb-8">
          Enter your credentials to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Select Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-block mt-3 text-zinc-500 hover:text-zinc-300"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );

}
export default LoginPage;