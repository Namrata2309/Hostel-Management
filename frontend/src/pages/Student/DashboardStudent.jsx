
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../scripts/api';
import { FireUid } from '../../scripts/firebase';
import axios from 'axios';

const firebaseUid =await FireUid()
console.log(firebaseUid);

const backUrl = import.meta.env.VITE_BACKEND_URL;
const res = await axios.post(`${backUrl}/api/users/getUserByFirebaseUid`, {
  firebaseUid,
});

console.log(res);


const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({
    name: res.data.email,
    id: 'STU2023001',
    room: res.data.roomNo,
    hostel: 'Boys Hostel A',
    contact: 'john.doe@example.com',
    phone: '+1234567890'
  });
  const [showOtherReason, setShowOtherReason] = useState(false);
  
  const [notices, setNotices] = useState([
    { id: 1, title: 'Hostel Maintenance', date: '2023-05-15', content: 'Scheduled maintenance on May 20th from 2-5 PM' },
    { id: 2, title: 'Fee Payment Deadline', date: '2023-05-10', content: 'Last date for hostel fee payment is May 25th' }
  ]);
  
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: 'Hostel Cultural Night', date: '2023-06-05', time: '7:00 PM' },
    { id: 2, title: 'Sports Tournament', date: '2023-06-12', time: '4:00 PM' }
  ]);
  
  const [complaints, setComplaints] = useState([{}]);
  
  const [leaveApplications, setLeaveApplications] = useState([
    { id: 1, fromDate: '2023-04-15', toDate: '2023-04-18', reason: 'Family function', status: 'Approved', date: '2023-04-10' },
    { id: 2, fromDate: '2023-05-05', toDate: '2023-05-07', reason: 'Medical emergency', status: 'Pending', date: '2023-05-02' }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  

  const submitComplaint = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newComplaint = {
      id: complaints.length + 1,
      title: formData.get('title'),
      description: formData.get('description'),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setComplaints([...complaints, newComplaint]);
    alert('Complaint submitted successfully!');
    e.target.reset();
  };

  const submitLeaveApplication = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLeaveApplication = {
      id: leaveApplications.length + 1,
      fromDate: formData.get('fromDate'),
      toDate: formData.get('toDate'),
      address: formData.get('address'),
      reason: formData.get('reasonType') === 'Other' 
              ? formData.get('otherReason') 
              : formData.get('reasonType'),
      parentPhone: formData.get('parentPhone'),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setLeaveApplications([...leaveApplications, newLeaveApplication]);
    alert('Leave application submitted successfully!');
    e.target.reset();
    setShowOtherReason(false);
  };
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-indigo-800 text-white p-5 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Hostel Management System</h1>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block font-medium bg-indigo-700/30 px-4 py-1 rounded-full">
              {studentData.room}
            </span>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block font-medium">Welcome, {studentData.name}</span>
              <button 
                 
                className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all
                          transform hover:scale-105 active:scale-95 shadow-md"
              >
                Logout →
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-64 bg-indigo-800/95 text-white p-4 min-h-screen border-r border-indigo-900/50">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-indigo-500/80 rounded-full flex items-center justify-center mx-auto mb-3 
                           text-3xl font-bold shadow-lg border-2 border-indigo-300/30">
              {studentData.name.charAt(0)}
            </div>
            <h3 className="font-bold text-lg mb-1">{studentData.name}</h3>
            <p className="text-sm text-indigo-200">ID: {studentData.id}</p>
            <p className="text-sm text-indigo-300 mt-1">{studentData.hostel}</p>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
              { id: 'profile', label: 'My Profile', icon: '👤' },
              { id: 'leave', label: 'Leave Application', icon: '📝' },
              { id: 'complaints', label: 'Complaints', icon: '⚠️' },
              { id: 'notices', label: 'Notices', icon: '📢' },
              { id: 'events', label: 'Events', icon: '🎉' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all
                  ${activeTab === tab.id 
                    ? 'bg-indigo-600/90 shadow-inner font-semibold' 
                    : 'hover:bg-indigo-700/50 hover:translate-x-1'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-lg mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Enhanced Main Content Area */}
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Room Number', value: studentData.room, bg: 'bg-blue-100' },
                  { 
                    title: 'Pending Complaints', 
                    value: complaints.filter(c => c.status === 'Pending').length,
                    bg: 'bg-amber-100' 
                  },
                  { 
                    title: 'Leave Requests', 
                    value: `${leaveApplications.filter(l => l.status === 'Pending').length} Pending`,
                    bg: 'bg-emerald-100' 
                  },
                ].map((card, idx) => (
                  <div key={idx} className={`${card.bg} p-6 rounded-2xl shadow-lg border border-white/50`}>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
                    <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Notices */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  📌 Recent Notices
                </h3>
                <div className="space-y-6">
                  {notices.map(notice => (
                    <div key={notice.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-indigo-600">{notice.title}</h4>
                          <p className="text-gray-500 text-sm mt-1">{notice.date}</p>
                        </div>
                        <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                          Notice
                        </span>
                      </div>
                      <p className="text-gray-700 mt-2 leading-relaxed">{notice.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Profile Section */}
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Profile Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  ['Full Name', studentData.name],
                  ['Student ID', studentData.id],
                  ['Hostel', studentData.hostel],
                  ['Room No', studentData.room],
                  ['Email', studentData.contact],
                  ['Phone', studentData.phone],
                ].map(([label, value], idx) => (
                  <div key={idx} className="bg-gray-50/50 p-4 rounded-xl">
                    <dt className="text-sm font-medium text-gray-500 mb-1">{label}</dt>
                    <dd className="text-lg text-gray-800 font-medium">{value}</dd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Leave Application Section */}
          {activeTab === 'leave' && (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-800">Leave Management</h2>
    
    {/* New Leave Application Form */}
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span className="bg-green-600 text-white p-2 rounded-lg">📅</span>
        New Leave Application
      </h3>
      <form onSubmit={submitLeaveApplication} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <span className="text-red-500">*</span>
              Leaving Date
            </label>
            <input 
              type="date" 
              name="fromDate" 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <span className="text-red-500">*</span>
              Joining Date
            </label>
            <input 
              type="date" 
              name="toDate" 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <span className="text-red-500">*</span>
            Address During Leave
          </label>
          <input 
            type="text" 
            name="address" 
            required 
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter complete address where you'll stay"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <span className="text-red-500">*</span>
              Reason for Leave
            </label>
            <select 
              name="reasonType" 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setShowOtherReason(e.target.value === 'Other')}
            >
              <option value="">Select Reason</option>
              <option value="Medical">Medical</option>
              <option value="Family Emergency">Family Emergency</option>
              <option value="Personal">Personal</option>
              <option value="Academic">Academic</option>
              <option value="Other">Other</option>
            </select>
            {showOtherReason && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please Specify Reason
                </label>
                <textarea 
                  name="otherReason" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Describe your reason in detail"
                ></textarea>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <span className="text-red-500">*</span>
              Parent's/Guardian's Phone
            </label>
            <input 
              type="tel" 
              name="parentPhone" 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter contact number"
              pattern="[0-9]{10}"
            />
            <p className="text-sm text-gray-500 mt-1">10-digit phone number</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition-all
                      font-medium text-lg shadow-lg hover:shadow-indigo-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Submit Application
          </button>
        </div>
      </form>
    </div>

    {/* Previous Applications Cards */}
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span className="bg-purple-600 text-white p-2 rounded-lg">📋</span>
        Leave History
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leaveApplications.map(application => (
          <div key={application.id} className="bg-gray-50/50 p-6 rounded-xl border border-gray-200/30 hover:border-indigo-200/60 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {application.fromDate} - {application.toDate}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Applied on: {application.date}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Reason:</span>
                <span className="text-gray-600">{application.reason}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-gray-600">{application.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700">Parent's Phone:</span>
                <span className="text-gray-600">{application.parentPhone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{activeTab === 'complaints' && (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Complaint Management</h2>
    
    {/* New Complaint Form */}
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span className="bg-indigo-600 text-white p-2 rounded-lg">📝</span>
        Submit New Complaint
      </h3>
      <form onSubmit={submitComplaint} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <span className="text-red-500">*</span>
            Complaint Title
          </label>
          <input 
            type="text" 
            name="title" 
            required 
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter complaint title..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <span className="text-red-500">*</span>
            Detailed Description
          </label>
          <textarea 
            name="description" 
            required 
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Describe your complaint in detail..."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition-all
                      font-medium text-lg shadow-lg hover:shadow-indigo-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Submit Complaint
          </button>
        </div>
      </form>
    </div>

    {/* Previous Complaints Cards */}
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span className="bg-amber-500 text-white p-2 rounded-lg">📋</span>
        Complaint History
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complaints.map(complaint => (
          <div key={complaint.id} className="bg-gray-50/50 p-6 rounded-xl border border-gray-200/30 hover:border-indigo-200/60 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{complaint.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted on: {complaint.date}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </span>
            </div>
            {complaint.description && (
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {complaint.description}
              </p>
            )}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Last updated: {complaint.date}
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                  ID: #{complaint.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

          {/* Enhanced Notices Section */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Hostel Notices</h2>
              <div className="grid grid-cols-1 gap-6">
                {notices.map(notice => (
                  <div key={notice.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{notice.title}</h3>
                        <p className="text-sm text-indigo-600 mt-1">{notice.date}</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        Official Notice
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{notice.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Events Section */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100
                                               hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        🎉 Event
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        📅 {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        🕒 {event.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;



