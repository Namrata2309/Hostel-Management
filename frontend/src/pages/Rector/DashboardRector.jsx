import React, { useState,useEffect } from 'react';
import Sidebar from "./Sidebar";
import RegisterStudent from "./RegisterStudent";
import PostNotice from "./PostNotice";
import LeaveApplications from "./LeaveApplications";
import Complaints from "./Complaints";
import AddEvent from "./AddEvent";
import StudentsList from "./StudentsList";
import { FireUid } from '../../scripts/firebase';
import axios from 'axios';



const DashboardRector = () => {
  const [currentTab, setCurrentTab] = useState("register");
  const[userData ,setUserData] = useState({}); // State to hold user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firebaseUid = await FireUid();
        const backUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.post(`${backUrl}/api/users/getUserByFirebaseUid`, { firebaseUid });
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
      case "All Students":
        return <StudentsList />;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
         {/* Enhanced Header */}
         <header className="bg-indigo-800 text-white p-5 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Hostel Management System</h1>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block font-medium bg-indigo-700/30 px-4 py-1 rounded-full">
              {userData.roll}
            </span>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block font-medium">Welcome, {userData.name}</span>
              <button 
                 
                className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all
                          transform hover:scale-105 active:scale-95 shadow-md"
              >
                Logout →
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Sidebar: full height for md+, top-fixed mobile sidebar */}
      <div className="md:w-64 w-full md:h-screen">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        {renderTab()}
      </div>
    </div>
  );
};

export default DashboardRector;
