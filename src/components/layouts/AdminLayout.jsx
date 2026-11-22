import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useAdminStore } from "../../store/useAdminStore";

export function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const logOutAdmin = useAdminStore((state) => state.logOutAdmin);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logOutAdmin();
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Admin Dashboard", path: "/admin/dashboard", icon: "📊" },
    {
      name: "All Doctors",
      path: "/admin/doctors",
      icon: "🩺",
      badge: "Verification",
    },
    { name: "All Patients", path: "/admin/patients", icon: "👥" },
    { name: "Hospital Appointments", path: "/admin/appointments", icon: "📅" },
    { name: "System Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar for Admin (Desktop) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
            <div className="w-9 h-9 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold">
              ★
            </div>
            <div>
              <span className="font-bold text-white text-base">CarePulse</span>
              <span className="text-[10px] text-purple-400 font-semibold block -mt-1 uppercase tracking-wider">
                Hospital Command
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin/dashboard"}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {user?.name || user?.fullName || "Administrator"}
              </p>
              <p className="text-[10px] text-purple-400 truncate">
                Super Administrator
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-xs font-semibold py-2 px-3 bg-slate-800 hover:bg-red-600/80 text-slate-300 hover:text-white rounded-lg transition-all"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar with hamburger menu */}
        <header className="md:hidden bg-slate-900 text-white h-14 flex items-center justify-between px-4 sticky top-0 z-40 border-b border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none transition-colors"
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
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-purple-600 text-white rounded flex items-center justify-center font-bold text-xs">
                ★
              </div>
              <span className="font-bold text-sm tracking-tight">CarePulse Admin</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs bg-slate-800 hover:bg-red-600/80 text-slate-300 hover:text-white px-2.5 py-1 rounded transition-colors"
          >
            Logout
          </button>
        </header>

        {/* Mobile Navigation Drawer & Backdrop */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Drawer */}
            <div className="relative w-72 max-w-[85vw] bg-slate-900 text-white flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              <div>
                <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      ★
                    </div>
                    <div>
                      <span className="font-bold text-white text-sm">CarePulse</span>
                      <span className="text-[10px] text-purple-400 font-semibold block -mt-1 uppercase tracking-wider">
                        Hospital Command
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="p-4 space-y-1.5">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/admin/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* User Card & Logout in Drawer */}
              <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs">
                    AD
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">
                      {user?.name || user?.fullName || "Administrator"}
                    </p>
                    <p className="text-[10px] text-purple-400 truncate">
                      Super Administrator
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-xs font-semibold py-2 px-3 bg-slate-800 hover:bg-red-600/80 text-slate-300 hover:text-white rounded-lg transition-all"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
