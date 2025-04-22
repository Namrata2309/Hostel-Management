import axios from "axios";
import { signInWithEmailAndPassword, signInWithPopup,signOut } from "firebase/auth";
import { auth, provider } from "./firebase";


// You must pass email and password to handleEmailLogin
// Also fix axios URLs
const backUrl=import.meta.env.VITE_BACKEND_URL
console.log(backUrl);


export const sendTokenToBackend = async (token) => {
  const response = await axios.post(`${backUrl}/api/auth/login`, {
    token,
  });
  return response.data;
};

export const handleGoogleLogin = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const res = await axios.post(`${backUrl}/api/auth/login`, { token });
    const user = res.data.user;
    console.log("Google login user:", user);

    if (user.role === 'superadmin') {
       navigate('/SuperAdmin');
    } else if (user.role === 'student') {
       navigate('/student');
    } else if (user.role === 'staff') {
       navigate('/pages/Staff/StaffDashboard');
    } else {
       navigate('/pages/DefaultDashboard');
    }

  } catch (err) {
    console.error("Google login error", err.message);
  }
};

export const handleEmailLogin = async (e, email, password, navigate) => {
  e.preventDefault();
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();

    const res = await axios.post(`${backUrl}/api/auth/login`, { token });
    const user = res.data.user;
    console.log("Email login user:", user);

    if (user.role === 'superadmin') {
       navigate('/SuperAdmin');
    } else if (user.role === 'student') {
       navigate('/student');
    } else if (user.role === 'staff') {
       navigate('/pages/Staff/StaffDashboard');
    } else {
       navigate('/pages/DefaultDashboard');
    }

  } catch (err) {
    console.error("Email login error", err.message);
  }
};


// Logout function
export const handleLogout = async (navigate) => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");

    // Optionally clear localStorage/sessionStorage if used
    // localStorage.removeItem("someToken");

    // Redirect to login page or home page
    navigate('/');
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};