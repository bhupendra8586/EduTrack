import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-800 flex items-center justify-center px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Student Academic
            <span className="block text-blue-500">
              Management System
            </span>
          </h1>

          <p className="text-zinc-300 text-lg">
            A web-based mini project designed to digitalize academic
            management in educational institutions. This system provides
            a secure and centralized platform for administrators, teachers,
            and students.
          </p>

          <p className="text-zinc-400">
            Built using the MERN stack, the application focuses on role-based
            authentication, structured data management, and easy access to
            academic records such as attendance and results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Key Features:
              </h3>
              <ul className="space-y-2 text-zinc-400">
                <li>1.RBAC Authentication</li>
                <li>2.Secure Authentication using JWT and cookies</li>
                <li>3.Built with MERN Stack</li>
                <li>4.Student & Teacher Record Management</li>
                <li>5.Attendance and Marks Tracking</li>
              </ul>
            </div>

            

          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl p-10 w-full max-w-md ml-auto">

          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Welcome
          </h2>

          <p className="text-zinc-400 mb-8 text-center">
            Login to continue or register as admin
          </p>

          <div className="flex flex-col gap-4">
            <Link to="/login">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold transition">
                Login
              </button>
            </Link>

            <Link to="/signin">
              <button className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg text-lg font-semibold transition">
                Signin (Admin Only)
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;