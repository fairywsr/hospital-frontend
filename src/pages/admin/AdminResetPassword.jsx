import { useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";
import { useAuthStore } from "../../store/useAuthStore";
import Unauthorized from "../Unauthorized";

function AdminResetPassword() {
  const { token } = useParams();
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
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetPassword = useAdminStore((state) => state.resetPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

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
      const data = await resetPassword(token, {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setSuccessMessage(
        data?.message || "Password updated successfully! Redirecting to login…"
      );
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Reset link is invalid or has expired. Please request a new one."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8 text-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-purple-600 text-white rounded-xl mx-auto flex items-center justify-center shadow-lg shadow-purple-900/50 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2 border border-purple-500/30">
            Set New Password
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Reset Admin Password
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Choose a strong new password for your administrator account.
          </p>
        </div>

        {/* Error */}
        {formError && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-700/60 rounded-lg text-xs text-red-300 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 shrink-0 text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <span>{formError}</span>
          </div>
        )}

        {/* Success */}
        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-xs text-emerald-300 flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              New Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                required
                className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                required
                className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
              >
                {showConfirm ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/50 transition-all disabled:opacity-70"
          >
            {submitting ? "Updating Password…" : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Link expired?{" "}
          <Link
            to="/admin/forgot-password"
            className="font-semibold text-purple-400 hover:underline"
          >
            Request a new one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminResetPassword;
