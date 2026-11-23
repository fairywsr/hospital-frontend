import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Header() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const location = useLocation();

  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const loginRef = useRef(null);
  const registerRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
    if (!user) return "/patient/login";
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
              Helpline:{" "}
              <strong className="text-white">+1 (800) 555-0199</strong>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
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
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600 hover:text-blue-600"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/specialties"
              className={`${
                location.pathname.startsWith("/specialties")
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600 hover:text-blue-600"
              } transition-colors`}
            >
              Specialties
            </Link>
            <Link
              to="/find-doctor"
              className={`${
                location.pathname.startsWith("/find-doctor") ||
                location.pathname.startsWith("/doctors")
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600 hover:text-blue-600"
              } transition-colors`}
            >
              Find Doctors
            </Link>
            <Link
              to="/doctor/register"
              className="hover:text-teal-600 transition-colors font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100"
            >
              Join as Doctor
            </Link>
          </nav>

          {/* Desktop Action CTAs */}

          <div className="hidden md:flex items-center gap-3">
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
                <Link
                  to="/patient/login"
                  className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-blue-600 border border-slate-300 hover:border-blue-400 px-3.5 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  to="/patient/register"
                  className="inline-flex items-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm shadow-blue-200 transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Bar: Quick Action & Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <Link
                to={getPortalRoute()}
                className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {user.role} Portal
              </Link>
            ) : (
              <Link
                to="/patient/login"
                className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 focus:outline-none transition-colors border border-slate-200"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-3 space-y-3 bg-white animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                  location.pathname === "/"
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>Home</span>
                <span>🏠</span>
              </Link>
              <Link
                to="/specialties"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                  location.pathname.startsWith("/specialties")
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>Specialties</span>
                <span>🏥</span>
              </Link>
              <Link
                to="/find-doctor"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                  location.pathname.startsWith("/find-doctor") ||
                  location.pathname.startsWith("/doctors")
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>Find Doctors</span>
                <span>🔍</span>
              </Link>
              <Link
                to="/doctor/register"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-teal-700 bg-teal-50 border border-teal-100 hover:bg-teal-100 flex items-center justify-between transition-colors"
              >
                <span>Join as Doctor</span>
                <span>🩺</span>
              </Link>
            </nav>

            {/* Mobile Auth / Role Actions */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs text-slate-600">
                    Logged in as{" "}
                    <strong className="text-slate-900">
                      {user.name || user.email}
                    </strong>{" "}
                    ({user.role})
                  </div>
                  <Link
                    to={getPortalRoute()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center text-sm font-semibold text-blue-700 bg-blue-100/70 hover:bg-blue-200 py-2.5 rounded-lg transition-colors"
                  >
                    Go to {user.role} Portal
                  </Link>
                  <button
                    onClick={() => {
                      clearUser();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center text-xs font-semibold text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors border border-red-100"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/patient/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 text-center"
                    >
                      Patient Login
                    </Link>
                    <Link
                      to="/patient/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center shadow-sm"
                    >
                      Patient Register
                    </Link>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-1 text-xs text-slate-500">
                    <Link
                      to="/doctor/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-teal-600 underline underline-offset-2"
                    >
                      Doctor Login
                    </Link>
                    <Link
                      to="/admin/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-purple-600 underline underline-offset-2"
                    >
                      Admin Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
