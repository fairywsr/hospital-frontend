import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useDoctorStore } from "../../store/userDoctorStore";

export function DoctorLayout() {
  const user = useAuthStore((state) => state.user);
  const logoutDoctor = useDoctorStore((state) => state.logoutDoctor);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logoutDoctor();
    navigate("/doctor/login");
  };

  const navItems = [
    { name: "Doctor Dashboard", path: "/doctor/dashboard", icon: "📊" },
    { name: "Appointments Queue", path: "/doctor/appointments", icon: "🩺" },
    { name: "My Patients", path: "/doctor/patients", icon: "👥" },
    { name: "Schedule & Slots", path: "/doctor/schedule", icon: "⏰" },
    { name: "Doctor Profile", path: "/doctor/profile", icon: "👨‍⚕️" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Clinical Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/doctor/dashboard" className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">
                  ⚕
                </div>
                <div>
                  <span className="font-bold text-white text-base">
                    Care<span className="text-teal-400">Pulse</span>
                  </span>
                  <span className="text-[10px] text-teal-300 font-semibold block -mt-1 tracking-wider uppercase">
                    Physician &amp; Clinical Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation (Desktop) */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/doctor/dashboard"}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Doctor info & Logout (Desktop) */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-white">
                  {user?.name || user?.fullName || "Doctor"}
                </span>
                <span className="text-[10px] text-teal-400 font-mono">
                  {user?.specilization || user?.specialization || "Attending Physician"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-red-600/80 text-slate-200 hover:text-white rounded-lg transition-all border border-slate-700"
              >
                Log Out
              </button>
            </div>

            {/* Mobile Actions: Compact Logout + Hamburger Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-2 py-1 bg-slate-800 hover:bg-red-600/80 text-slate-200 hover:text-white rounded-lg transition-all border border-slate-700"
              >
                Log Out
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-1.5 rounded-lg bg-slate-800 text-teal-300 hover:text-white hover:bg-slate-700 focus:outline-none transition-colors border border-slate-700"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>

            {/* Tablet Hamburger (hidden on mobile and md+) */}
            <div className="hidden sm:flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-1.5 rounded-lg bg-slate-800 text-teal-300 hover:text-white hover:bg-slate-700 focus:outline-none transition-colors border border-slate-700"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-5 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
            {/* Doctor Info Chip */}
            <div className="px-3 py-2 bg-slate-800/80 rounded-xl flex items-center justify-between border border-slate-700">
              <div>
                <p className="text-xs font-bold text-white">
                  {user?.name || user?.fullName || "Doctor"}
                </p>
                <p className="text-[10px] text-teal-400 font-mono">
                  {user?.specilization || user?.specialization || "Attending Physician"}
                </p>
              </div>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full font-semibold">
                Clinical Portal
              </span>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/doctor/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-slate-500 text-xs">→</span>
                </NavLink>
              ))}
            </nav>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-center text-xs font-semibold py-2 px-3 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white rounded-lg transition-all border border-red-500/30"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Clinical Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorLayout;
