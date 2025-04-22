import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import DashboardSuperAdmin from "./pages/SuperAdmin/DashboardSuperAdmin";
import DashboardRector from "./pages/Rector/DashboardRector";
import StudentDashboard from "./pages/Student/DashboardStudent";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SuperAdmin" element={<DashboardSuperAdmin />} />
        <Route path="/rector" element={<DashboardRector />} />

        <Route path="/student" element={<StudentDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
