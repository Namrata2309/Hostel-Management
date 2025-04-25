
import { signOut } from "firebase/auth";
import { auth } from "./firebase";



// You must pass email and password to handleEmailLogin
// Also fix axios URLs
const backUrl=import.meta.env.VITE_BACKEND_URL
console.log(backUrl);


// console.log(auth.currentUser);

// const firebaseUid = auth.currentUser
// export const res = await axios.post(`/api/users/getUserByFirebaseUid`, {
//   firebaseUid,
// });







// Logout function


export const handleLogout = async (navigate, setError, userdata) => {
  try {
    await signOut(auth);
    if (userdata) userdata.current = null;
    navigate("/");
  } catch (err) {
    console.error("Logout error:", err);
    if (setError) setError("Logout failed. Please try again.");
  }
};