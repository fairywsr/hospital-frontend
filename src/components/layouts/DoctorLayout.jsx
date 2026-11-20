import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export function DoctorLayout() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
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
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800">
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
                    Physician & Clinical Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation */}
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

            {/* Doctor info & Logout */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-white">
                  {user?.name || user?.fullName || "Doctor"}
                </span>
                <span className="text-[10px] text-teal-400 font-mono">
                  {user?.specialization || "Attending Physician"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-red-600/80 text-slate-200 hover:text-white rounded-lg transition-all border border-slate-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Clinical Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorLayout;
