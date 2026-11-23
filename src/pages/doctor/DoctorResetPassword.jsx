import { useState } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { useDoctorStore } from "../../store/userDoctorStore";
import { useAuthStore } from "../../store/useAuthStore";
import Unauthorized from "../Unauthorized";

function DoctorResetPassword() {
  const { token } = useParams();
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

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [msg, setMsg] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetPassword = useDoctorStore((s) => s.resetPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setFormError("");

    if (!token) {
      setFormError("Invalid or missing reset token. Please request a new link.");
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
      const data = await resetPassword(token, {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setMsg(data?.message || "Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/doctor/login", { replace: true }), 2000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message || err?.message || "Password reset failed. Link may have expired."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-teal-600 text-white rounded-xl mx-auto flex items-center justify-center shadow-md shadow-teal-200 mb-3">
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
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2 border border-teal-200">
            Physician Portal
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Reset Doctor Password
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter and confirm your new password below.
          </p>
        </div>

        {/* Success */}
        {msg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span>{msg}</span>
          </div>
        )}

        {/* Error */}
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 shrink-0 text-red-600"
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                required
                className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                required
                className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showConfirm ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Resetting Password...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Link expired?{" "}
          <Link to="/doctor/forgot-password" className="font-semibold text-teal-600 hover:underline">
            Request a new link
          </Link>
          <span className="mx-2">•</span>
          <Link to="/doctor/login" className="font-semibold text-slate-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorResetPassword;
