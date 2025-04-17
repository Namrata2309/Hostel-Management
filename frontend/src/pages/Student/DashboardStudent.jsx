// pages/Student/DashboardStudent.jsx
export default function DashboardStudent() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow rounded">My Room Details</div>
          <div className="p-4 bg-white shadow rounded">Submit Complaint</div>
          <div className="p-4 bg-white shadow rounded">Apply for Leave</div>
          <div className="p-4 bg-white shadow rounded">Fee Status</div>
        </div>
      </div>
    );
  }
  