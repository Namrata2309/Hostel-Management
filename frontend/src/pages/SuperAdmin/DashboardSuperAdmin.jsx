import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../scripts/firebase";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";



const DashboardSuperAdmin = () => {
  const [role, setRole] = useState("rector");
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, rectors: 0, students: 0 });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchRole = watch("role", "rector");
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "activities"), (snapshot) => {
      const logs = snapshot.docs.map((doc) => doc.data());
      setActivities(logs.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${backUrl}/api/stats/overview`);
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      function generateGoogleStyleId() {
        return `G-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      }

      function generategoogleId() {
        return `G-${Math.floor(100000000000000000000 + Math.random() * 900000000000000000000)}`;
      }

      await axios.post(`${backUrl}/api/users/register`, {
        firebaseUid: userCredential.user.uid,
        email: data.email,
        username: data.username,
        googleId: generategoogleId(),
        googleStyleId: generateGoogleStyleId(),
        role: data.role,
        roomNo: data.role === "student" ? data.roomNo : null,
      });

      await addDoc(collection(db, "activities"), {
        user: data.username,
        role: data.role,
        activity: `Registered as ${data.role}`,
        timestamp: serverTimestamp(),
      });

      toast.success(`${data.role} registered successfully!`);
      reset();
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-4 h-16 flex items-center border-b border-indigo-700">
          <h1 className="text-xl font-bold">Super Admin</h1>
        </div>
        <nav className="flex-1 mt-6 space-y-1">
          <div className="px-4 py-3 bg-indigo-800 flex items-center space-x-3 cursor-pointer">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <a className="px-4 py-3 flex items-center space-x-3 text-indigo-100 hover:bg-indigo-700 cursor-pointer">
            <Users size={20} />
            <span>Manage Users</span>
          </a>
          <a className="px-4 py-3 flex items-center space-x-3 text-indigo-100 hover:bg-indigo-700 cursor-pointer">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>
        <div className="border-t border-indigo-700 p-4">
          <a className="flex items-center space-x-3 text-indigo-100 hover:bg-indigo-700 px-4 py-2 rounded cursor-pointer">
            <LogOut size={20} />
            <span>Logout</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow h-16 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard Overview</h2>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              SA
            </div>
            <span className="text-sm text-gray-700">Super Admin</span>
            <ChevronDown size={16} />
          </div>
        </header>

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-gray-600 text-sm mb-2">Total Users</h4>
              <p className="text-2xl font-bold text-indigo-700">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-gray-600 text-sm mb-2">Active Rectors</h4>
              <p className="text-2xl font-bold text-indigo-700">{stats.rectors}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-gray-600 text-sm mb-2">Registered Students</h4>
              <p className="text-2xl font-bold text-indigo-700">{stats.students}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Register New User</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                {...register("username", { required: "Username is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                {...register("role")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="rector">Rector</option>
                <option value="student">Student</option>
              </select>
            </div>

            {watchRole === "student" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Number</label>
                <input
                  {...register("roomNo", { required: "Room Number is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.roomNo && <p className="text-red-500 text-sm mt-1">{errors.roomNo.message}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold mb-4">Recent Activity</h4>
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2">User</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Activity</th>
                  <th className="pb-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{a.user}</td>
                    <td>{a.role}</td>
                    <td>{a.activity}</td>
                    <td>{a.timestamp?.seconds ? new Date(a.timestamp.seconds * 1000).toLocaleString() : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSuperAdmin;