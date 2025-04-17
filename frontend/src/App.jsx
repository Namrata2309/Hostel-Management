import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import DashboardSuperAdmin from "./pages/SuperAdmin/DashboardSuperAdmin";
import DashboardRector from "./pages/Rector/DashboardRector";
import DashboardStudent from "./pages/Student/DashboardStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/superadmin" element={<DashboardSuperAdmin />} />
        <Route path="/rector" element={<DashboardRector />} />
        <Route path="/student" element={<DashboardStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
