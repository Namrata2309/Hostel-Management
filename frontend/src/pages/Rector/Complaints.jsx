import { useState } from "react";
import toast from "react-hot-toast";

const Complaints = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "AC not working",
      status: "Resolved",
      date: "2023-05-01",
      name: "Priya Sharma",
      room: "A-102",
      type: "Electrical",
      message: "The AC in my room isn't cooling properly and makes loud noise.",
    },
    {
      id: 2,
      title: "Water leakage",
      status: "In Progress",
      date: "2023-05-10",
      name: "Rohan Mehta",
      room: "B-205",
      type: "Plumbing",
      message: "There is continuous leakage from the bathroom tap.",
    },
  ]);

  const statusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
        🛠️ Student Complaints
      </h2>

      <div className="grid gap-6">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">{c.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  🧑 {c.name} &nbsp;|&nbsp; 🏠 Room: {c.room}
                </p>
              </div>
              <span
                className={`w-fit text-sm px-3 py-1 rounded-full font-medium ${statusColor(
                  c.status
                )}`}
              >
                {c.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              🛠️ <strong>Type:</strong> {c.type}
            </p>

            <p className="text-gray-700 mb-2 text-sm">
              📋 <strong>Description:</strong> {c.message}
            </p>

            <p className="text-xs text-gray-400 mt-2">📅 Reported on: {c.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
