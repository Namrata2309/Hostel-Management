import { useState } from "react";
import Sidebar from "./Sidebar";
import RegisterStudent from "./RegisterStudent";
import PostNotice from "./PostNotice";
import LeaveApplications from "./LeaveApplications";
import Complaints from "./Complaints";
import AddEvent from "./AddEvent";
import StudentsList from "./StudentsList";

const DashboardRector = () => {
  const [currentTab, setCurrentTab] = useState("register");

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
    <div className="flex h-screen">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">{renderTab()}</div>
    </div>
  );
};

export default DashboardRector;
