import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function DoctorDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Physician Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Welcome, Dr. {user?.name || user?.fullName || "Physician"}
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Department: <strong className="text-teal-300">{user?.specialization || user?.department || "Cardiology"}</strong> • License: {user?.licenseNumber || "MED-84920"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/doctor/appointments"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              🩺 Manage Patient Queue
            </Link>
            <Link
              to="/doctor/patients"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              👥 View All Patients
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Today's Appointments</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">8 Patients</p>
          <span className="text-xs text-teal-600 font-medium">3 Pending Approval</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Completed Consultations</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">142</p>
          <span className="text-xs text-emerald-600 font-medium">+12 this week</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Average Rating</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">4.9 / 5.0</p>
          <span className="text-xs text-amber-500 font-medium">★★★★★</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Clinical Status</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">Available</p>
          <span className="text-xs text-slate-500 font-medium">On-Duty</span>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
