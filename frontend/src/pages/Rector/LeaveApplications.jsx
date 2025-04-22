import { useState } from "react";
import toast from "react-hot-toast";

const LeaveApplications = () => {
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      name: "Anjali Sharma",
      rollNo: "CE202301",
      fromDate: "2023-04-15",
      toDate: "2023-04-18",
      reason: "Family function",
      status: "Approved",
      date: "2023-04-10",
    },
    {
      id: 2,
      name: "Ravi Verma",
      rollNo: "CE202302",
      fromDate: "2023-05-05",
      toDate: "2023-05-07",
      reason: "Medical emergency",
      status: "Pending",
      date: "2023-05-02",
    },
  ]);

  const handleStatusChange = (id, status) => {
    setLeaveApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    toast.success(`Leave ${status}`);
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
            key={app.id}
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
              🗓️ <strong>From:</strong> {app.fromDate} &nbsp;|&nbsp;
              <strong>To:</strong> {app.toDate}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              ✏️ <strong>Reason:</strong> {app.reason}
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-xs text-gray-400">
                📅 Applied on: {app.date}
              </span>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleStatusChange(app.id, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(app.id, "Rejected")}
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
