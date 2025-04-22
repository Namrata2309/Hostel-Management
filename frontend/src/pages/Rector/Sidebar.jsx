import { LayoutDashboard, FilePlus, Megaphone, ClipboardList, CalendarPlus } from "lucide-react";

const Sidebar = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: "register", label: "Register Student", icon: <FilePlus size={18} /> },
    { id: "notice", label: "Post Notice", icon: <Megaphone size={18} /> },
    { id: "leaves", label: "Leave Applications", icon: <ClipboardList size={18} /> },
    { id: "complaints", label: "Complaints", icon: <LayoutDashboard size={18} /> },
    { id: "events", label: "Add Event", icon: <CalendarPlus size={18} /> },
    { id: "All Students", label: "Students", icon: <ClipboardList size={18} /> },
   
  ];

  return (
    <div className="w-64 bg-indigo-900 text-white h-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-8">Rector Panel</h1>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`flex items-center px-4 py-2 rounded hover:bg-indigo-700 w-full text-left ${
            currentTab === tab.id ? "bg-indigo-800" : ""
          }`}
          onClick={() => setCurrentTab(tab.id)}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
