import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const backUrl = import.meta.env.VITE_BACKEND_URL;

const LeaveApplications = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${backUrl}/api/leave`);
      setLeaveApplications(res.data);
    } catch (err) {
      toast.error("Failed to fetch leave data");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${backUrl}/api/leave/${id}`, { status });
      toast.success(`Leave ${status}`);
      fetchLeaves();
    } catch (err) {
      toast.error("Failed to update leave status");
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
        📋 Leave Applications
      </h2>

      <div className="grid gap-6">
        {leaveApplications.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                {app.name}{" "}
                <span className="text-sm text-gray-500">({app.rollNo})</span>
              </h3>
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${statusColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-1">
              🗓️ <strong>From:</strong> {new Date(app.fromDate).toLocaleDateString()} &nbsp;|&nbsp;
              <strong>To:</strong> {new Date(app.toDate).toLocaleDateString()}
            </p>

            <p className="text-sm text-gray-700 mb-1">
              🛏️ <strong>Room No:</strong> {app.roomNo}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              ✏️ <strong>Reason:</strong> {app.reasonType}
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-xs text-gray-400">
                📅 Applied on: {new Date(app.date).toLocaleString()}
              </span>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleStatusChange(app._id, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(app._id, "Rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveApplications;
