import { useState } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'register', label: 'Register Student', icon: '📝' },
    { id: 'leaves', label: 'Leave Application', icon: '📄' },
    { id: 'complaints', label: 'Complaints', icon: '⚠️' },
    { id: 'notice', label: 'Notices', icon: '📢' },
    { id: 'events', label: 'Events', icon: '🎉' },
    { id: 'students', label: 'Students List', icon: '📚' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-indigo-900 text-white px-4 py-3">
        <h1 className="text-xl font-bold">Rector Panel</h1>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileOpen ? "block" : "hidden"
        } md:block ${isCollapsed ? 'w-16' : 'w-64'} bg-indigo-800/95 text-white p-4 h-screen  border-r border-indigo-900/50 transition-all duration-300 ease-in-out relative`}
        >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          {!isCollapsed && (
            <div className="py-4 text-2xl font-bold">Rector Panel</div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "px-4"
              } py-3 rounded-xl transition-all
              ${
                activeTab === tab.id
                  ? "bg-indigo-600/90 shadow-inner font-semibold"
                  : "hover:bg-indigo-700/50 hover:translate-x-1"
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileOpen(false); // Close mobile menu
              }}
            >
              <span className="text-lg mr-3">{tab.icon}</span>
              {!isCollapsed && tab.label}
            </button>
          ))}
        </nav>

        {/* Collapse/Expand Toggle */}
         <button
                  onClick={toggleSidebar}
                  className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-indigo-200 text-indigo-800 p-1.5 rounded-full shadow-lg hover:shadow-xl border border-indigo-300 group transition-all duration-200 ease-in-out"
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  <div className="flex items-center justify-center bg-indigo-100 rounded-full w-6 h-6 group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-200">
                    {isCollapsed ? 
                      <ChevronRight size={16} className="text-indigo-700 group-hover:text-indigo-600" /> : 
                      <ChevronLeft size={16} className="text-indigo-700 group-hover:text-indigo-600" />
                    }
                  </div>
                </button>
      </aside>
    </>
  );
};

export default Sidebar;
