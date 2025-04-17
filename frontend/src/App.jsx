import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import DashboardSuperAdmin from "./pages/SuperAdmin/DashboardSuperAdmin";
import DashboardRector from "./pages/Rector/DashboardRector";
import StudentDashboard from "./pages/Student/DashboardStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SuperAdmin" element={<DashboardSuperAdmin />} />
        <Route path="/rector" element={<DashboardRector />} />
<<<<<<< HEAD
        <Route path="/Student" element={<DashboardStudent />} />
        
=======
        <Route path="/student" element={<StudentDashboard />} />
>>>>>>> 84b5658af7d30998d40265903df2ab3e0d1eb82b
      </Routes>
    </Router>
  );
}

export default App;
