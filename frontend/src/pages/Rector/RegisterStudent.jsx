import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../scripts/firebase";
import toast from "react-hot-toast";



const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roomNo: "",
    rollNo: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generateGoogleStyleId = () => {
    return `G-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  };

  const generateGoogleId = () => {
    return `G-${Math.floor(100000000000000000000 + Math.random() * 900000000000000000000)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, roomNo, rollNo } = formData;

    if (!name || !email || !password || !roomNo || !rollNo) {
      return toast.error("Please fill in all fields");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const firebaseUid = userCredential.user.uid;

      await axios.post(`/api/users/register`, {
        firebaseUid,
        email,
        username: name,
        googleId: generateGoogleId(),
        googleStyleId: generateGoogleStyleId(),
        role: "student",
        roomNo,
        rollNo,
      });

      toast.success("🎉 Student registered successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        roomNo: "",
        rollNo: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Registration Failed!");
    }
    
    
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-14">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-6">
          🎓 Register Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            placeholder="Room Number"
          />
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            placeholder="Roll Number"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 text-sm sm:text-base"
          >
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
