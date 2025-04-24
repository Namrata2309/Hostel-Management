import React, { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import RegisterStudent from "./RegisterStudent";
import PostNotice from "./PostNotice";
import LeaveApplications from "./LeaveApplications";
import Complaints from "./Complaints";
import AddEvent from "./AddEvent";
import StudentsList from "./StudentsList";
import { FireUid } from "../../scripts/firebase";
import axios from "axios";

const DashboardRector = () => {
  const [currentTab, setCurrentTab] = useState("register");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firebaseUid = await FireUid();
        const backUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.post(`/api/users/getUserByFirebaseUid`, {
          firebaseUid,
        });
        setUserData(res.data);
        console.log("User data:", res.data);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/"); // Redirect to login if there's an error
      }
    };

    fetchUserData();
  }, []);

  const renderTab = () => {
    switch (currentTab) {
      case "register":
        return <RegisterStudent />;
      case "notice":
        return <PostNotice />;
      case "leaves":
        return <LeaveApplications />;
      case "complaints":
        return <Complaints />;
      case "events":
        return <AddEvent />;
      case "students":
        return <StudentsList />;
      default:
        return <div>Select a tab</div>;
    }
  };
  

  

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-indigo-800 text-white p-5 shadow-lg h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          <h1 className="text-xl sm:text-2xl font-bold">Hostel Management System</h1>
          <div className="flex items-center gap-6">
            {userData.roll && (
              <span className="hidden sm:inline-block bg-indigo-700/30 px-4 py-1 rounded-full font-medium">
                {userData.roll}
              </span>
            )}
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block font-medium">Welcome, {userData.username}</span>
              <button
                className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transform transition-all hover:scale-105 active:scale-95"
                onClick={() => console.log("Logout clicked")}
              >
                Logout →
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar (with padding top to avoid going under fixed header) */}
      <div className="md:w-64 w-full pt-16 md:pt-0 md:h-screen">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>

      {/* Main content (with padding top to prevent overlap with fixed header) */}
      <main className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-y-auto h-[calc(100vh-64px)] pt-20 md:pt-6">
        {renderTab()}
      </main>
    </div>
  );
};

export default DashboardRector;
