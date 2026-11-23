import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAdminStore } from "../../store/useAdminStore";
import { useAuthStore } from "../../store/useAuthStore";
import Unauthorized from "../Unauthorized";

function AdminForgotPassword() {
  const authUser = useAuthStore((state) => state.user);

  // If already logged in as Patient or Doctor, render Unauthorized component
  if (authUser && authUser.role && authUser.role.toLowerCase() !== "admin") {
    return <Unauthorized />;
  }

  // If already logged in as Admin, redirect to dashboard
  if (authUser && authUser.role && authUser.role.toLowerCase() === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetPasswordRequest = useAdminStore(
    (state) => state.resetPasswordRequest
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setFormError("Please enter your admin email address.");
      return;
    }

    setSubmitting(true);
    try {
      const data = await resetPasswordRequest({ email });
      setSuccessMessage(
        data?.message ||
          `A password reset link has been sent to ${email}. Please check your inbox.`
      );
      setEmail("");
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to send reset email. Please try again."
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
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"
              />
            </svg>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2 border border-purple-500/30">
            Account Recovery
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin Password Reset
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enter your registered admin email and we'll send you a secure reset
            link.
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
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@carepulse.com"
              required
              className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/50 transition-all disabled:opacity-70"
          >
            {submitting ? "Sending Reset Link…" : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Remembered your password?{" "}
          <Link
            to="/admin/login"
            className="font-semibold text-purple-400 hover:underline"
          >
            Back to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminForgotPassword;
