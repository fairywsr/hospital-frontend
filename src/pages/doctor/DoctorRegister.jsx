import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDoctorStore } from "../../store/userDoctorStore";
import { useAuthStore } from "../../store/useAuthStore";
import Unauthorized from "../Unauthorized";

function DoctorRegister() {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);

  // If already logged in as Patient or Admin, render Unauthorized component
  if (authUser && authUser.role && authUser.role.toLowerCase() !== "doctor") {
    return <Unauthorized />;
  }

  // If already logged in as Doctor, redirect to dashboard
  if (authUser && authUser.role && authUser.role.toLowerCase() === "doctor") {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    specialization: "Cardiologist",
    licenseNumber: "",
    doctorAge: "35",
    doctorGender: "Male",
    experienceYears: "5",
    qualification: "MBBS, MD",
    consultationFee: "50",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const doctorRegister = useDoctorStore((state) => state.registerDoctor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setFormError("Please fill in Name, Email, and Password.");
      return;
    }

    if (!formData.licenseNumber.trim()) {
      setFormError("Doctor registration requires a Medical License Number.");
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
      const rawLicense = formData.licenseNumber.replace(/\D/g, "");
      const licenseValue = rawLicense ? Number(rawLicense) : Math.floor(100000 + Math.random() * 900000);

      const payload = {
        name: formData.fullName,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        specilization: formData.specialization,
        specialization: formData.specialization,
        license: licenseValue,
        licenseNumber: formData.licenseNumber,
        age: Number(formData.doctorAge) || 35,
        experience: Number(formData.experienceYears) || 3,
        experienceYears: Number(formData.experienceYears) || 3,
        gender: formData.doctorGender || "Male",
        qualification: formData.qualification,
        consultationFee: formData.consultationFee,
        role: "Doctor",
      };

      await doctorRegister(payload);
      setSuccessMessage(
        "Doctor registration submitted successfully! Pending admin approval. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/doctor/login");
      }, 2000);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Doctor registration failed. Please check your information and try again.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Left Side: Doctor Clinical Branding */}
        <div className="lg:col-span-4 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-500 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-md">
                ⚕
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  Care<span className="text-teal-300">Pulse</span>
                </span>
                <span className="text-[10px] font-medium text-teal-200 uppercase tracking-widest block -mt-1">
                  Medical Faculty
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              Join Medical Staff
            </h2>
            <p className="text-sm text-teal-200 mb-6 leading-relaxed">
              Register as a physician or specialist. Manage your daily OPD schedule, consultation queues, and patient records.
            </p>

            <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-200 mb-4">
              <p className="font-semibold text-amber-300 mb-1">⚠️ Administrative Verification</p>
              <p>
                To maintain clinical quality, doctor profiles are reviewed and approved by the Hospital Administrator before receiving live appointment requests.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-teal-700/50 text-xs text-teal-200">
            <span>Already registered as a physician? </span>
            <Link to="/doctor/login" className="font-semibold text-white hover:text-teal-200 underline">
              Sign In here
            </Link>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Doctor Registration</h1>
                <p className="text-sm text-slate-500">Enter your credentials and medical practice information</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                Physician Credentialing
              </span>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between">
                <span>{formError}</span>
                <button type="button" onClick={() => setFormError("")} className="text-red-400 hover:text-red-700">
                  ✕
                </button>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Doctor Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Dr. Sarah Mitchell"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="doctor@carepulse.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

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
                    placeholder="+1 (555) 234-5678"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Medical License No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="e.g. 84920"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

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
                      placeholder="Confirm password"
                      className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specialization</label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all bg-white"
                  >
                    <option value="Cardiologist">Cardiologist (Cardiology)</option>
                    <option value="Neurologist">Neurologist (Neurology)</option>
                    <option value="Pediatrician">Pediatrician (Pediatrics)</option>
                    <option value="Dermatologist">Dermatologist (Dermatology)</option>
                    <option value="Immunologist">Immunologist (Immunology)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    name="doctorGender"
                    value={formData.doctorGender}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="doctorAge"
                    value={formData.doctorAge}
                    onChange={handleChange}
                    min="25"
                    max="80"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience (Yrs)</label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    min="0"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. MBBS, MD, FCPS"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fee ($)</label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    min="1"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-200 transition-all disabled:opacity-70"
                >
                  {submitting ? "Submitting Application..." : "Submit Doctor Registration"}
                </button>
              </div>
            </form>
          </div>


        </div>
      </div>
    </div>
  );
}

export default DoctorRegister;
