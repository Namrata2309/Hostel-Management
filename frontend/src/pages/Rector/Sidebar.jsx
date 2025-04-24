import { useState } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Sidebar = ({ activeTab, setCurrentTab }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationTabs = [
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

      <div className="fixed"> 
  <aside  
    className={`${isCollapsed ? 'w-0 overflow-hidden p-0' : 'w-64 p-4'} bg-indigo-800/95 text-white h-screen border-r border-indigo-900/50 transition-all duration-300 ease-in-out relative`} 
  > 
    {!isCollapsed && (
      <>
        <div className="text-center mb-8"> 
          {/* Profile preview */} 
          <div className="py-4">{activeTab}</div>
        </div> 
  
        <nav className="space-y-2"> 
          {navigationTabs.map((tab) => ( 
            <button 
              key={tab.id} 
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all 
                ${activeTab === tab.id  
                  ? 'bg-indigo-600/90 shadow-inner font-semibold'  
                  : 'hover:bg-indigo-700/50 hover:translate-x-1'}`} 
              onClick={() => setCurrentTab(tab.id)} 
            > 
              <span className="text-lg mr-3">{tab.icon}</span>
              {tab.label}
            </button> 
          ))} 
        </nav>
      </>
    )}
  </aside>
  
  {/* Toggle button positioned outside the sidebar and centered vertically */}
  <button 
    onClick={toggleSidebar} 
    className={`fixed ${isCollapsed ? 'left-3' : 'left-60'} top-1/2 -translate-y-1/2 bg-indigo-200 text-indigo-800 p-1.5 rounded-full shadow-lg hover:shadow-xl border border-indigo-300 group transition-all duration-200 ease-in-out z-10`}
    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} 
  > 
    <div className="flex items-center justify-center bg-indigo-100 rounded-full w-6 h-6 group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-200"> 
      {isCollapsed ?  
        <ChevronRight size={16} className="text-indigo-700 group-hover:text-indigo-600" /> :  
        <ChevronLeft size={16} className="text-indigo-700 group-hover:text-indigo-600" /> 
      } 
    </div> 
  </button>
</div>

    </>
  );
};

export default Sidebar;
