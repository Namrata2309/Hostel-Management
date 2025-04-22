import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserCircleIcon, EnvelopeIcon, HomeModernIcon } from "@heroicons/react/24/outline";

const backUrl = import.meta.env.VITE_BACKEND_URL;

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${backUrl}/api/users/students`);
        setStudents(res.data);
      } catch (err) {
        toast.error("Failed to fetch student list.");
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
        🧑‍🎓 Student Directory
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <UserCircleIcon className="h-10 w-10 text-indigo-500" />
              <h3 className="text-xl font-semibold text-gray-800">
                {student.username}
              </h3>
            </div>

            <div className="space-y-2 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                <span className="break-all">{student.email}</span>
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
