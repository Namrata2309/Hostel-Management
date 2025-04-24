import React, { useEffect, useState } from "react";
import axios from "axios";
import { FireUid } from "../../scripts/firebase";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [students, setStudents] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firebaseUid = await FireUid();
       

        const [userRes, studentRes, complaintRes, leaveRes] = await Promise.all([
          axios.post(`/api/users/getUserByFirebaseUid`, { firebaseUid }),
          axios.get(`/api/users/students`),
          axios.get(`/api/complaints`),
          axios.get(`/api/leave`),
        ]);

        // console.log("User:", userRes.data);
        // console.log("Students List:", studentRes.data);
        // console.log("Complaints:", complaintRes.data);
        // console.log("Leaves:", leaveRes.data);

        setUserData(userRes.data);
        setStudents(studentRes.data || []);
        setComplaints(complaintRes.data.data || complaintRes.data || []);
        setLeaveApplications(leaveRes.data.data || leaveRes.data || []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      bg: "bg-blue-100",
    },
    {
      title: "Pending Complaints",
      value: complaints.filter((c) => c.status === "Pending").length,
      bg: "bg-amber-100",
    },
    {
      title: "Leave Requests",
      value: `${leaveApplications.filter((l) => l.status === "Pending").length} Pending`,
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 sm:p-6 md:p-10 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((card, idx) => (
            <div
              key={idx}
              className={`${card.bg} p-4 sm:p-6 rounded-2xl shadow-md sm:shadow-lg border border-white/40 transition hover:scale-105 hover:shadow-xl duration-200`}
            >
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">
                {card.title}
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl shadow p-6 text-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Welcome, {userData.name} 👋</h2>
            <p className="text-sm sm:text-base">
              You are logged in as{" "}
              <span className="font-medium text-blue-600">{userData.role || "User"}</span>. Use the
              panel above to get an overview of student stats, complaints, and leave requests.
            </p>
          </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
