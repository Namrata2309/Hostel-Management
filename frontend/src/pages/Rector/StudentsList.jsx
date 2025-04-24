import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  UserCircleIcon,
  EnvelopeIcon,
  HomeModernIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const backUrl = import.meta.env.VITE_BACKEND_URL;

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${backUrl}/api/users/students`);
      setStudents(res.data);
    } catch (err) {
      toast.error("Failed to fetch student list.");
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this student?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backUrl}/api/users/${studentId}`);
      setStudents((prev) => prev.filter((s) => s._id !== studentId));
      toast.success("Student removed successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove student.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 py-15">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-8 sm:mb-10 text-center">
        🧑‍🎓 Student Directory
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-gradient-to-br from-white to-slate-50 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 relative"
          >
            <button
              onClick={() => handleDelete(student._id)}
              className="absolute top-3 right-3 p-1.5 text-red-500 hover:text-red-700 transition"
              title="Remove Student"
            >
              <TrashIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <UserCircleIcon className="h-9 w-9 sm:h-10 sm:w-10 text-indigo-500" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {student.username}
              </h3>
            </div>

            <div className="space-y-2 text-gray-600 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                <span className="break-words">{student.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <HomeModernIcon className="h-5 w-5 text-gray-500" />
                <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  Room No: {student.roomNo}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsList;
