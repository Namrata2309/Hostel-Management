// pages/SuperAdmin/DashboardSuperAdmin.jsx
export default function DashboardSuperAdmin() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow rounded">Manage Hostels</div>
          <div className="p-4 bg-white shadow rounded">Add/Remove Rectors</div>
          <div className="p-4 bg-white shadow rounded">View All Students</div>
          <div className="p-4 bg-white shadow rounded">Generate Reports</div>
        </div>
      </div>
    );
  }
  