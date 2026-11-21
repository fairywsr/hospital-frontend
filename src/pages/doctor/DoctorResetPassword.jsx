import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDoctorStore } from "../../store/userDoctorStore";

function DoctorResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetPassword = useDoctorStore((s) => s.resetPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setFormError("");
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
      setMsg(data?.message || "Password reset successfully!");
      setTimeout(() => navigate("/doctor/login"), 2000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message || err?.message || "Password reset failed."
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
            Reset Password
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter and confirm your new password below.
          </p>
        </div>

        {msg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
            ✅ {msg} Redirecting to login...
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
              New Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                required
                className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPw ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat new password"
              required
              className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-200 transition-all disabled:opacity-70"
          >
            {submitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          <Link to="/doctor/login" className="font-semibold text-teal-600 hover:underline">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorResetPassword;
