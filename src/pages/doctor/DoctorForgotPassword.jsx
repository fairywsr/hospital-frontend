import { useState } from "react";
import { Link } from "react-router-dom";
import { useDoctorStore } from "../../store/userDoctorStore";

function DoctorForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetPasswordRequest = useDoctorStore((s) => s.resetPasswordRequest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setFormError("");
    setSubmitting(true);
    try {
      const data = await resetPasswordRequest({ email });
      setMsg(data?.message || "Reset link sent! Please check your inbox.");
    } catch (err) {
      setFormError(
        err?.response?.data?.message || err?.message || "Failed to send reset email."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-teal-600 text-white rounded-xl mx-auto flex items-center justify-center shadow-md shadow-teal-200 mb-3 text-xl font-bold">
            ⚕
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2 border border-teal-200">
            Physician Portal
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Forgot Password
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your registered email and we'll send a reset link.
          </p>
        </div>

        {msg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
            ✅ {msg}
          </div>
        )}
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            ❌ {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Physician Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dr.name@carepulse.com"
              required
              className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-200 transition-all disabled:opacity-70"
          >
            {submitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Remembered your password?{" "}
          <Link to="/doctor/login" className="font-semibold text-teal-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorForgotPassword;
