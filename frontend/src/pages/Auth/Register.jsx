import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    studentId: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const nextStep = () => {
    // Validate first step fields
    if (step === 1) {
      if (!formData.username || !formData.email) {
        setError("Please fill in all required fields");
        return;
      }
      
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError("Please enter a valid email address");
        return;
      }
    }
    
    // Validate second step fields
    if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }
    }
    
    setError("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Final validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (passwordStrength < 2) {
      setError("Please create a stronger password");
      return;
    }

    const submissionData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    // Add student-specific fields if applicable
    if (formData.role === "student") {
      submissionData.studentId = formData.studentId;
      submissionData.department = formData.department;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", submissionData);
      
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 px-4 py-10">
      <div className="bg-white p-0 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 text-white p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-blue-900">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold">Government Hostel Management</h1>
          <h2 className="text-lg font-medium mt-1 opacity-90">Account Registration</h2>
        </div>
        
        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex justify-between mb-8">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 1 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
              <span className="text-xs mt-1 text-gray-600">Account</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 flex-1 ${step >= 2 ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 2 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
              <span className="text-xs mt-1 text-gray-600">Security</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 flex-1 ${step >= 3 ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 3 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
              <span className="text-xs mt-1 text-gray-600">Details</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your full name"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                  >
                    <option value="student">Student Resident</option>
                    <option value="rector">Hostel Rector</option>
                    <option value="superadmin">System Administrator</option>
                  </select>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition duration-300 font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                  
                  {/* Password strength indicator */}
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength === 0 ? 'w-0' :
                          passwordStrength === 1 ? 'w-1/4 bg-red-500' :
                          passwordStrength === 2 ? 'w-2/4 bg-yellow-500' :
                          passwordStrength === 3 ? 'w-3/4 bg-blue-500' :
                          'w-full bg-green-500'
                        }`}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Weak</span>
                      <span className="text-xs text-gray-500">Strong</span>
                    </div>
                    <ul className="text-xs text-gray-600 mt-2 space-y-1 pl-5 list-disc">
                      <li className={formData.password.length >= 8 ? "text-green-600" : ""}>
                        At least 8 characters
                      </li>
                      <li className={formData.password.match(/[A-Z]/) ? "text-green-600" : ""}>
                        At least one uppercase letter
                      </li>
                      <li className={formData.password.match(/[0-9]/) ? "text-green-600" : ""}>
                        At least one number
                      </li>
                      <li className={formData.password.match(/[^A-Za-z0-9]/) ? "text-green-600" : ""}>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition duration-300 font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition duration-300 font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {step === 3 && (
              <div className="space-y-4">
                {formData.role === "student" && (
                  <>
                    <div>
                      <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                        Student ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="studentId"
                        type="text"
                        name="studentId"
                        placeholder="Enter your student ID number"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required={formData.role === "student"}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Department/Faculty
                      </label>
                      <input
                        id="department"
                        type="text"
                        name="department"
                        placeholder="Enter your department or faculty"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                <div className="pt-2 mb-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        I agree to the{" "}
                        <Link to="/terms" className="text-blue-800 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-blue-800 hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition duration-300 font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition duration-300 font-medium flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-800 font-medium hover:text-blue-900">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs text-center text-gray-500">
              © {new Date().getFullYear()} Government Hostel Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;