import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const backUrl = import.meta.env.VITE_BACKEND_URL;

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${backUrl}/api/complaints`);
        setComplaints(res.data);
      } catch (error) {
        toast.error("Failed to fetch complaints");
        console.error(error);
      }
    };

    fetchComplaints();
  }, []);

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
    <div className="w-full px-4 sm:px-6 md:px-8 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
        🛠️ Student Complaints
      </h2>

      <div className="grid gap-6">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">{c.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  🧑 {c.name} &nbsp;|&nbsp; 🏠 Room: {c.roomNo}
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
              📋 <strong>Description:</strong> {c.description}
            </p>

            <p className="text-xs text-gray-400 mt-2">📅 Reported on: {new Date(c.reportedDate).toLocaleString()}</p>

            {/* Status Dropdown */}
            <div className="mt-4">
              <label htmlFor={`status-${c._id}`} className="block text-sm font-medium text-gray-700">
                Update Status
              </label>
              <select
                id={`status-${c._id}`}
                value={c.status}
                onChange={async (e) => {
                  const newStatus = e.target.value;
                  try {
                    const res = await axios.patch(
                      `${backUrl}/api/complaints/${c._id}/status`,
                      { status: newStatus }
                    );
                    setComplaints((prev) =>
                      prev.map((item) => (item._id === c._id ? res.data : item))
                    );
                    toast.success("Status updated");
                  } catch (error) {
                    toast.error("Failed to update status");
                    console.error(error);
                  }
                }}
                className="mt-2 block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
