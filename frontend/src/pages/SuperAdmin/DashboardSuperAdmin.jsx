import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../scripts/firebase';
import axios from 'axios';
import { UserPlus, Users, LogOut, Settings, ChevronDown, Mail, Lock, UserCheck } from 'lucide-react';

const DashboardSuperAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rector');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save user role in MongoDB
      await axios.post('http://localhost:5000/api/users', {
        uid: userId,
        email,
        role
      });

      setSuccessMessage(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);
      setShowSuccess(true);
      setEmail('');
      setPassword('');
      setRole('rector');
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      alert('Registration failed: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-4 h-16 flex items-center border-b border-blue-700">
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-3 bg-blue-900 text-white flex items-center space-x-3 cursor-pointer">
            <UserPlus size={20} />
            <span>User Management</span>
          </div>
          <a className="px-4 py-3 flex items-center space-x-3 text-blue-100 hover:bg-blue-700 cursor-pointer">
            <Users size={20} />
            <span>View Users</span>
          </a>
          <a className="px-4 py-3 flex items-center space-x-3 text-blue-100 hover:bg-blue-700 cursor-pointer">
            <Settings size={20} />
            <span>System Settings</span>
          </a>
          <div className="absolute bottom-0 left-0 w-64 border-t border-blue-700">
            <a className="px-4 py-3 flex items-center space-x-3 text-blue-100 hover:bg-blue-700 cursor-pointer">
              <LogOut size={20} />
              <span>Logout</span>
            </a>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow-sm h-16 flex items-center px-6 justify-between">
          <h2 className="text-lg font-semibold">Super Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-1 text-gray-700 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  SA
                </div>
                <span>Super Admin</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <div className="mb-6">
            <h3 className="text-gray-700 text-2xl font-bold">User Management</h3>
            <p className="text-gray-500">Create new user accounts for rectors and students</p>
          </div>
          
          {showSuccess && (
            <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-center">
              <UserCheck className="mr-2" size={20} />
              {successMessage}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h4 className="text-lg font-semibold mb-6">Register New User</h4>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="user@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCheck size={18} className="text-gray-400" />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="rector">Rector</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end pt-4">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => {
                    setEmail('');
                    setPassword('');
                    setRole('rector');
                  }}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} className="mr-2" />
                      Register User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSuperAdmin;