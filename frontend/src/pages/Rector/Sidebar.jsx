import { useState } from "react";
import {
  LayoutDashboard,
  FilePlus,
  Megaphone,
  ClipboardList,
  CalendarPlus,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ currentTab, setCurrentTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: "register", label: "Register Student", icon: <FilePlus size={18} /> },
    { id: "notice", label: "Post Notice", icon: <Megaphone size={18} /> },
    { id: "leaves", label: "Leave Applications", icon: <ClipboardList size={18} /> },
    { id: "complaints", label: "Complaints", icon: <LayoutDashboard size={18} /> },
    { id: "events", label: "Add Event", icon: <CalendarPlus size={18} /> },
    { id: "All Students", label: "Students", icon: <ClipboardList size={18} /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-indigo-900 text-white px-4 py-3">
        <h1 className="text-xl font-bold">Rector Panel</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block bg-indigo-900 text-white w-full md:w-64 h-[calc(100vh-64px)] md:h-screen fixed md:static top-[64px] md:top-0 left-0 z-50 md:z-auto px-4 py-4 md:pt-8 space-y-4 transition-all duration-300 overflow-y-auto`}
      >
        <div className="hidden md:block text-2xl font-bold mb-6">Rector Panel</div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-2 rounded hover:bg-indigo-700 w-full text-left ${
              currentTab === tab.id ? "bg-indigo-800" : ""
            }`}
            onClick={() => {
              setCurrentTab(tab.id);
              setIsOpen(false); // Close sidebar on mobile after selecting
            }}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
