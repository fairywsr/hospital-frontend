import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Header() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(false);
  const loginRef = useRef(null);
  const registerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setLoginMenuOpen(false);
      }
      if (registerRef.current && !registerRef.current.contains(event.target)) {
        setRegisterMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPortalRoute = () => {
    if (!user) return "/login";
    if (user.role === "Admin") return "/admin/dashboard";
    if (user.role === "Doctor") return "/doctor/dashboard";
    return "/patient/dashboard";
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top hospital emergency banner */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 Emergency Care
            </span>
            <span className="hidden sm:inline text-blue-300">|</span>
            <span className="hidden sm:inline">
              Helpline: <strong className="text-white">+1 (800) 555-0199</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-blue-200">
            <span>OPD: Mon - Sat (8:00 AM - 8:00 PM)</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Hospital Brand & Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Care<span className="text-blue-600">Pulse</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest block -mt-1">
                Hospital & Clinic
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link to="/" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Home
            </Link>
            <a href="#specialties" className="hover:text-blue-600 transition-colors">
              Specialties
            </a>
            <a href="#doctors" className="hover:text-blue-600 transition-colors">
              Find Doctors
            </a>
            <Link
              to="/doctor/register"
              className="hover:text-teal-600 transition-colors font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100"
            >
              Join as Doctor
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getPortalRoute()}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span>Go to {user.role} Portal</span>
                </Link>
                <button
                  onClick={() => clearUser()}
                  className="text-xs font-medium text-slate-500 hover:text-red-600 px-2 py-1.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                {/* Sign In Dropdown */}
                <div className="relative" ref={loginRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMenuOpen((prev) => !prev);
                      setRegisterMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-blue-600 border border-slate-300 hover:border-blue-400 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    <span>Sign In</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-slate-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {loginMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Select Sign In View
                      </div>
                      <Link
                        to="/patient/login"
                        onClick={() => setLoginMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span>Patient Portal Sign In</span>
                      </Link>
                      <Link
                        to="/doctor/login"
                        onClick={() => setLoginMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        <span>Doctor & Physician Sign In</span>
                      </Link>
                      <Link
                        to="/admin/login"
                        onClick={() => setLoginMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span>Hospital Admin Sign In</span>
                      </Link>
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <Link
                          to="/login"
                          onClick={() => setLoginMenuOpen(false)}
                          className="block px-3 py-1.5 text-[11px] text-center text-blue-600 hover:underline"
                        >
                          View all portal options →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Register Dropdown */}
                <div className="relative" ref={registerRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setRegisterMenuOpen((prev) => !prev);
                      setLoginMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm shadow-blue-200 transition-all"
                  >
                    <span>Register</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-blue-200">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {registerMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                      <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Select Registration View
                      </div>
                      <Link
                        to="/patient/register"
                        onClick={() => setRegisterMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span>Register as Patient</span>
                      </Link>
                      <Link
                        to="/doctor/register"
                        onClick={() => setRegisterMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        <span>Register as Doctor</span>
                      </Link>
                      <Link
                        to="/admin/register"
                        onClick={() => setRegisterMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span>Register as Admin</span>
                      </Link>
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <Link
                          to="/register"
                          onClick={() => setRegisterMenuOpen(false)}
                          className="block px-3 py-1.5 text-[11px] text-center text-blue-600 hover:underline"
                        >
                          View all registration views →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
