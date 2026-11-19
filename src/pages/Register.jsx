import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePatientStore } from "../store/usePatientStore";
import { useDoctorStore } from "../store/userDoctorStore";
import { useAdminStore } from "../store/useAdminStore";

function Register() {
  const navigate = useNavigate();

  // Role selection state: "Patient" | "Doctor" | "Admin"
  const [role, setRole] = useState("Patient");

  // Form input fields
  const [formData, setFormData] = useState({
    // Common
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    // Patient specific
    gender: "male",
    dob: "",
    bloodGroup: "O+",
    address: "",
    emergencyContact: "",
    // Doctor specific
    specialization: "Cardiology",
    department: "Cardiology",
    experienceYears: "",
    qualification: "MBBS, MD",
    licenseNumber: "",
    consultationFee: "50",
    // Admin specific
    adminSecretKey: "",
    adminDepartment: "Administration",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Store hooks
  const patientRegister = usePatientStore((state) => state.register);
  const doctorRegister = useDoctorStore((state) => state.registerDoctor);
  const adminRegister = useAdminStore((state) => state.registerAdmin);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formError) setFormError("");
  };

  // Handle role switch
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormError("");
    setSuccessMessage("");
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    // Validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setFormError("Please fill in all required fields (Name, Email, and Password).");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      if (role === "Patient") {
        const payload = {
          name: formData.fullName,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          gender: formData.gender,
          dob: formData.dob,
          bloodGroup: formData.bloodGroup,
          address: formData.address,
          emergencyContact: formData.emergencyContact,
          role: "Patient",
        };
        await patientRegister(payload);
        setSuccessMessage("Patient account created successfully! Redirecting to login...");
      } else if (role === "Doctor") {
        if (!formData.licenseNumber.trim()) {
          setFormError("Doctor registration requires a Medical License Number.");
          setSubmitting(false);
          return;
        }

        const payload = {
          name: formData.fullName,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          specialization: formData.specialization,
          department: formData.department,
          experience: formData.experienceYears,
          experienceYears: formData.experienceYears,
          qualification: formData.qualification,
          licenseNumber: formData.licenseNumber,
          consultationFee: formData.consultationFee,
          role: "Doctor",
        };
        await doctorRegister(payload);
        setSuccessMessage(
          "Doctor registration submitted! Your account is pending Admin approval. Redirecting to login..."
        );
      } else if (role === "Admin") {
        if (!formData.adminSecretKey.trim()) {
          setFormError("Admin registration requires a valid Hospital Secret Passkey.");
          setSubmitting(false);
          return;
        }

        const payload = {
          name: formData.fullName,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          adminSecretKey: formData.adminSecretKey,
          department: formData.adminDepartment,
          role: "Admin",
        };
        await adminRegister(payload);
        setSuccessMessage("Administrator account created successfully! Redirecting to login...");
      }

      // Redirect after brief pause
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please check your information and try again.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Left Side: Hospital Branding & Informational Panel */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Hospital Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  Care<span className="text-blue-300">Pulse</span>
                </span>
                <span className="text-[10px] font-medium text-blue-200 uppercase tracking-widest block -mt-1">
                  Healthcare Network
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              Join Our Care Network
            </h2>
            <p className="text-sm text-blue-200 mb-6 leading-relaxed">
              Create your account to access unified healthcare management, automated booking, clinical queues, and records.
            </p>

            {/* Role highlights */}
            <div className="space-y-3.5 text-xs">
              <div
                className={`p-3 rounded-xl border transition-all ${
                  role === "Patient"
                    ? "bg-white/15 border-blue-300/50 shadow-sm"
                    : "bg-white/5 border-white/10 opacity-70"
                }`}
              >
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>👤 Patient Portal</span>
                </div>
                <p className="text-blue-200 mt-1">Book appointments, consult specialists, and track health history.</p>
              </div>

              <div
                className={`p-3 rounded-xl border transition-all ${
                  role === "Doctor"
                    ? "bg-white/15 border-blue-300/50 shadow-sm"
                    : "bg-white/5 border-white/10 opacity-70"
                }`}
              >
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>🩺 Doctor Portal</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-200 px-1.5 py-0.5 rounded font-mono">
                    Verified
                  </span>
                </div>
                <p className="text-blue-200 mt-1">Manage consultation schedule, review patient records, and update prescriptions.</p>
              </div>

              <div
                className={`p-3 rounded-xl border transition-all ${
                  role === "Admin"
                    ? "bg-white/15 border-blue-300/50 shadow-sm"
                    : "bg-white/5 border-white/10 opacity-70"
                }`}
              >
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>🛡️ Hospital Admin</span>
                  <span className="text-[10px] bg-purple-400/20 text-purple-200 px-1.5 py-0.5 rounded font-mono">
                    Staff
                  </span>
                </div>
                <p className="text-blue-200 mt-1">Approve doctor profiles, oversee hospital appointments, and audit operations.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-blue-700/50 text-xs text-blue-200">
            <span>Already have an account? </span>
            <Link to="/login" className="font-semibold text-white hover:text-blue-200 underline">
              Sign In here
            </Link>
          </div>
        </div>

        {/* Right Side: Role Selector & Registration Form */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Top Header & Role Switcher */}
            <div className="mb-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
                  <p className="text-sm text-slate-500">Select your account role to proceed with registration</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Step 1 of 1
                </span>
              </div>

              {/* Role Switcher Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleRoleChange("Patient")}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    role === "Patient"
                      ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  Patient
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("Doctor")}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    role === "Doctor"
                      ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Doctor
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("Admin")}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    role === "Admin"
                      ? "bg-white text-blue-700 shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  Admin
                </button>
              </div>

              {/* Informational notice for Doctor role */}
              {role === "Doctor" && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 mt-0.5 shrink-0 text-amber-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>
                  <span>
                    <strong>Clinical Verification Notice:</strong> Doctor registrations are saved in pending status until reviewed and approved by the Hospital Administrator.
                  </span>
                </div>
              )}

              {/* Informational notice for Admin role */}
              {role === "Admin" && (
                <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-start gap-2 text-xs text-purple-800">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 mt-0.5 shrink-0 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <span>
                    <strong>Staff Security Verification:</strong> An authorized Hospital Secret Passkey is required to register an administrative user.
                  </span>
                </div>
              )}
            </div>

            {/* Error Notification */}
            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 shrink-0 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <span>{formError}</span>
                </div>
                <button type="button" onClick={() => setFormError("")} className="text-red-400 hover:text-red-700">
                  ✕
                </button>
              </div>
            )}

            {/* Success Notification */}
            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 shrink-0 text-emerald-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={role === "Doctor" ? "Dr. Sarah Mitchell" : "John Doe"}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@carepulse.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Phone & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 6 characters"
                      className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Conditional Fields based on Role */}
                {role === "Patient" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                {role === "Doctor" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Medical License No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="e.g. MED-84920"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                )}

                {role === "Admin" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hospital Secret Passkey <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="adminSecretKey"
                      value={formData.adminSecretKey}
                      onChange={handleChange}
                      placeholder="Enter hospital authorization key"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Extra Role-Specific Rows */}
              {role === "Patient" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                    >
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact</label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="+1 (555) 999-1111"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Apartment, Street, City, State"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}

              {role === "Doctor" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Specialization</label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pathology">Pathology</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Dermatology">Dermatology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Experience (Years)</label>
                    <input
                      type="number"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      placeholder="e.g. 8"
                      min="0"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="e.g. MBBS, MD, FCPS"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}

              {role === "Admin" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Administrative Dept</label>
                    <select
                      name="adminDepartment"
                      value={formData.adminDepartment}
                      onChange={handleChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                    >
                      <option value="Administration">Hospital Administration</option>
                      <option value="Medical Operations">Medical Operations</option>
                      <option value="Human Resources">HR & Doctor Verification</option>
                      <option value="Clinical Records">Clinical Records</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Access Level</label>
                    <input
                      type="text"
                      disabled
                      value="Full Hospital System Access"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-md shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating {role} Account...
                    </>
                  ) : (
                    <>Register as {role}</>
                  )}
                </button>
              </div>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            By registering, you agree to CarePulse's{" "}
            <a href="#" className="text-blue-600 hover:underline">Terms of Clinical Service</a> and{" "}
            <a href="#" className="text-blue-600 hover:underline">Patient Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
