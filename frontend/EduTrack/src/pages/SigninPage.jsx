import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import axios from "axios";
import API from "../api/api";

const SigninPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = { name, email, password };

      const res = await API.post("/auth/register-admin", user, {
        withCredentials: true
      });

      console.log("RESPONSE:", res);
      toast.success("Account registration successful");
      navigate("/");

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log("Signin error:", error);

      // backend message
      const msg = error.response?.data?.message || "Registration failed";

      toast.error(msg);
    }
  }






  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-300 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <Link
          to="/"
          className="inline-block mt-3 text-zinc-500 hover:text-zinc-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SigninPage;