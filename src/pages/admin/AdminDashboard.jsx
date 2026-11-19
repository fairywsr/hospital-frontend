import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function AdminDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest block mb-1">
            CarePulse Command Center
          </span>
          <h1 className="text-2xl font-bold text-slate-900">Hospital Administration Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as {user?.name || user?.fullName || "Administrator"} ({user?.email})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/pending-doctors"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            🩺 Verify Doctor Applications
          </Link>
        </div>
      </div>

      {/* Hospital Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Pending Doctor Approvals</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">4 Pending</p>
          <span className="text-xs text-amber-700 font-medium">Requires credential verification</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Active Doctors</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">28 Doctors</p>
          <span className="text-xs text-emerald-600 font-medium">Across 8 departments</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Registered Patients</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">1,248 Patients</p>
          <span className="text-xs text-blue-600 font-medium">+42 this month</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Hospital Appointments</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">3,480 Visits</p>
          <span className="text-xs text-slate-500 font-medium">98.4% fulfillment rate</span>
        </div>
      </div>

      {/* Quick Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">👨‍⚕️ Doctor Governance</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Review doctor profiles, activate approved medical staff, update licenses, and manage hospital rosters.
            </p>
          </div>
          <Link
            to="/admin/doctors"
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
          >
            Manage Doctors &rarr;
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">👥 Patient Directory</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Access emergency contacts, blood group registries, patient profiles, and medical visit histories.
            </p>
          </div>
          <Link
            to="/admin/patients"
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
          >
            View Patient Records &rarr;
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">📅 Central Scheduling</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Monitor OPD bookings across cardiology, neurology, pediatrics, orthopedics, and emergency wards.
            </p>
          </div>
          <Link
            to="/admin/appointments"
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
          >
            All Appointments &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
