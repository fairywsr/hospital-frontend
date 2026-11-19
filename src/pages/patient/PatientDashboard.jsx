import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function PatientDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
            Patient Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Welcome back, {user?.name || user?.fullName || "Patient"}!
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Manage your medical appointments, review laboratory test results, and connect with clinical specialists.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/patient/book-appointment"
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              📅 Book New Appointment
            </Link>
            <Link
              to="/patient/appointments"
              className="inline-flex items-center gap-2 bg-blue-500/30 hover:bg-blue-500/50 text-white border border-white/20 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              🩺 View My Visits
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Upcoming Appointments</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">1 Scheduled</p>
          <span className="text-xs text-blue-600 font-medium">Dr. Sarah Mitchell (Tomorrow)</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Blood Group & Type</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{user?.bloodGroup || "O+"}</p>
          <span className="text-xs text-emerald-600 font-medium">Normal / Active</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Prescriptions & Reports</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">3 Reports</p>
          <span className="text-xs text-slate-500 font-medium">Updated this week</span>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
