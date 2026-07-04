import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function ManageTeachers() {

    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch teachers
    const fetchTeachers = async () => {
        try {
            const res = await axios.get("http://localhost:7878/admin/teachers", {
                withCredentials: true,
            });

            setTeachers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:7878/admin/teachers/${id}`, {
                withCredentials: true,
            });

            fetchTeachers();
        } catch (err) {
            console.log(err);
        }
    };

    // Search filter
    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        teacher.email.toLowerCase().includes(search.toLowerCase()) ||
        teacher.department.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white p-10">


            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">Manage Teachers</h1>

                <div className="flex gap-4">


                    <input
                        type="text"
                        placeholder="Search teacher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-800 border border-slate-600 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />


                    <button
                        onClick={() => navigate("/admin/teachers/add")}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
                    >
                        Add Teacher
                    </button>

                </div>
            </div>


            <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">

                <table className="w-full text-left">


                    <thead className="bg-slate-700 text-gray-300">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Employee ID</th>
                            <th className="p-4">Subject Assigned</th>
                            <th className="p-4">Year</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {filteredTeachers.map((teacher) => (
                            <tr
                                key={teacher._id}
                                className="border-b border-slate-700 hover:bg-slate-700/40"
                            >
                                <td className="p-4">{teacher.name}</td>
                                <td className="p-4">{teacher.email}</td>
                                <td className="p-4">{teacher.department}</td>
                                <td className="p-4">{teacher.employeeId}</td>
                                <td className="p-4">{teacher.subjectAssigned?.map((item, index) => (
                                    <div key={index}>
                                        {item.subject} - Sem {item.semester}
                                    </div>
                                ))}</td>
                                <td className="p-4">{teacher.year} Year</td>

                                <td className="p-4 flex gap-3">

                                    <button
                                        onClick={() => navigate(`/admin/teachers/${teacher._id}`)}
                                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded-md"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(teacher._id)}
                                        className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md"
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

export default ManageTeachers;