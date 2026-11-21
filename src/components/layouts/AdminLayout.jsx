import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useAdminStore } from "../../store/useAdminStore";

export function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const logOutAdmin = useAdminStore((state) => state.logOutAdmin);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutAdmin();
    navigate("/admin/login");
  };

  const navItems = [
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
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar for Admin */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden bg-slate-900 text-white h-14 flex items-center justify-between px-4">
          <span className="font-bold text-sm">CarePulse Admin</span>
          <button
            onClick={handleLogout}
            className="text-xs bg-slate-800 px-2.5 py-1 rounded"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
