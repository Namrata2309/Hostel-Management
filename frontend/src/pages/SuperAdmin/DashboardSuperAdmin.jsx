import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../scripts/firebase"; // adjust your path
import axios from "axios";

const backUrl=import.meta.env.VITE_BACKEND_URL; // or your deployed backend

const DashboardSuperAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("rector");
  const [roomNo, setRoomNo] = useState("");
  // const[firebaseUid, setFirebaseUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create Firebase User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    
        function generateGoogleStyleId() {
            const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
            return `G-${randomNum}`;
        }
        function generategoogleId() {
          // Generate a Google-like ID (21 digits as in real Google IDs)
          return 'G-' + Math.floor(100000000000000000000 + Math.random() * 900000000000000000000).toString();
        }
        function uid(){
          
          
          return userCredential.user.uid;
        }

      // 2. Save to MongoDB
      await axios.post(`${backUrl}/api/users/register`, {
        firebaseUid: uid(),
        email,
        username,
        googleId: generategoogleId(),
      googleStyleId:generateGoogleStyleId(),
        role,
        roomNo: role === "student" ? roomNo : null,
      });

      // 3. Success Feedback
      setSuccessMessage(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);
      setShowSuccess(true);

      // 4. Reset Form
      setEmail("");
      setPassword("");
      setUsername("");
      setRoomNo("");
      setRole("rector");

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="rector">Rector</option>
        <option value="student">Student</option>
        <option value="staff">Staff</option>
        <option value="superadmin">Super Admin</option>
      </select>
      {role === "student" && (
        <input type="text" placeholder="Room No" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} required />
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>

      {showSuccess && <p className="text-green-600">{successMessage}</p>}
    </form>
  );
};

export default DashboardSuperAdmin;
