import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { usePatientStore } from "../../store/usePatientStore";

export function PatientLayout() {
  const user = useAuthStore((state) => state.user);
  const patientLogout = usePatientStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await patientLogout();
    navigate("/patient/login");
  };

  const navItems = [
    { name: "My Dashboard", path: "/patient/dashboard", icon: "📊" },
    { name: "Book Appointment", path: "/patient/book-appointment", icon: "📅" },
    { name: "My Appointments", path: "/patient/appointments", icon: "🩺" },
    { name: "My Profile", path: "/patient/profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Patient Portal Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <Link to="/patient/dashboard" className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                  +
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-base">
                    Care<span className="text-blue-600">Pulse</span>
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold block -mt-1 tracking-wider uppercase">
                    Patient Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/patient/dashboard"}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* User Chip & Logout */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800">{user?.name || user?.fullName || "Patient"}</span>
                <span className="text-[10px] text-emerald-600 font-medium">Verified Patient</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold px-3 py-1.5 border border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 rounded-lg transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;
