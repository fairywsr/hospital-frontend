import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDoctorStore } from "../../store/userDoctorStore";

function DoctorLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const doctorLogin = useDoctorStore((state) => state.loginDoctor);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      await doctorLogin({ email, password });
      navigate(from || "/doctor/dashboard", { replace: true });
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
        err?.message ||
        "Invalid doctor credentials. Please check your email and password."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        {/* Doctor Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-teal-600 text-white rounded-xl mx-auto flex items-center justify-center shadow-md shadow-teal-200 mb-3 text-xl font-bold">
            ⚕
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2 border border-teal-200">
            Physician & Clinical Portal
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Doctor Sign In</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your consultation queue, appointments, and patient diagnoses
          </p>
        </div>

        {/* Error message */}
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{formError}</span>
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <Link to="/doctor/forgot-password" className="text-xs text-teal-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
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

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-200 transition-all disabled:opacity-70"
          >
            {submitting ? "Authenticating Doctor..." : "Sign In to Doctor Portal"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          New hospital physician?{" "}
          <Link to="/doctor/register" className="font-semibold text-teal-600 hover:underline">
            Register as Doctor
          </Link>
        </div>

        {/* Portal Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 mb-2">Switch Portal</p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <Link to="/patient/login" className="text-blue-600 font-medium hover:underline">
              Patient Portal
            </Link>
            <span className="text-slate-300">•</span>
            <Link to="/admin/login" className="text-purple-600 font-medium hover:underline">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
