// pages/Rector/DashboardRector.jsx
export default function DashboardRector() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Rector Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow rounded">View Assigned Hostels</div>
          <div className="p-4 bg-white shadow rounded">Manage Students</div>
          <div className="p-4 bg-white shadow rounded">Check Complaints</div>
          <div className="p-4 bg-white shadow rounded">Approve Leaves</div>
        </div>
      </div>
    );
  }
  