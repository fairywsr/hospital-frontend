import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";
import { useAuthStore } from "../../store/useAuthStore";
import Unauthorized from "../Unauthorized";

function AdminRegister() {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);

  // If already logged in as Patient or Doctor, render Unauthorized component
  if (authUser && authUser.role && authUser.role.toLowerCase() !== "admin") {
    return <Unauthorized />;
  }

  // If already logged in as Admin, redirect to dashboard
  if (authUser && authUser.role && authUser.role.toLowerCase() === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    adminSecretKey: "",
    adminDepartment: "Administration",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const adminRegister = useAdminStore((state) => state.registerAdmin);

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

    if (!formData.adminSecretKey.trim()) {
      setFormError("Admin registration requires an authorized Hospital Secret Passkey.");
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

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Admin registration failed. Please verify the hospital secret passkey.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden text-white">
        {/* Left Side: Security Branding */}
        <div className="lg:col-span-4 bg-gradient-to-br from-purple-950 via-slate-900 to-black p-8 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-700">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md">
                ★
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  Care<span className="text-purple-400">Pulse</span>
                </span>
                <span className="text-[10px] font-medium text-purple-300 uppercase tracking-widest block -mt-1">
                  Hospital Management
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              Admin Credentialing
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Create an administrative user to manage hospital doctor verification, patient queues, and operational departments.
            </p>

            <div className="p-3.5 rounded-xl bg-purple-900/30 border border-purple-500/30 text-xs text-purple-200 mb-4">
              <p className="font-semibold text-purple-300 mb-1">🛡️ Protected Passkey Required</p>
              <p>
                Administrative accounts are protected. You must supply the verified hospital secret passkey to register.
              </p>
              <div className="mt-2 text-[11px] text-purple-300">
                Default: <code className="bg-purple-950 px-1.5 py-0.5 rounded font-mono">secretkey112234445</code>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-slate-700 text-xs text-slate-400">
            <span>Already have administrative access? </span>
            <Link to="/admin/login" className="font-semibold text-white hover:text-purple-300 underline">
              Sign In here
            </Link>
          </div>
        </div>

        {/* Right Side: Admin Form */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between bg-slate-800">
          <div>
            <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h1 className="text-2xl font-bold text-white">Administrator Registration</h1>
                <p className="text-sm text-slate-400">Set up hospital management credentials</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Staff Security Level
              </span>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-700/60 rounded-lg text-xs text-red-300 flex items-center justify-between">
                <span>{formError}</span>
                <button type="button" onClick={() => setFormError("")} className="text-red-400 hover:text-red-200">
                  ✕
                </button>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-xs text-emerald-300">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Admin Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@carepulse.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 888-0000"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hospital Secret Passkey <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    name="adminSecretKey"
                    value={formData.adminSecretKey}
                    onChange={handleChange}
                    placeholder="secretkey112234445"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 6 characters"
                      className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                    >
                      {showConfirmPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Administrative Dept</label>
                  <select
                    name="adminDepartment"
                    value={formData.adminDepartment}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                  >
                    <option value="Administration">Hospital Administration</option>
                    <option value="Medical Operations">Medical Operations</option>
                    <option value="Human Resources">HR & Doctor Verification</option>
                    <option value="Clinical Records">Clinical Records</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Access Level</label>
                  <input
                    type="text"
                    disabled
                    value="Full Hospital System Access"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/50 transition-all disabled:opacity-70"
                >
                  {submitting ? "Registering Administrator..." : "Create Admin Account"}
                </button>
              </div>
            </form>
          </div>


        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
