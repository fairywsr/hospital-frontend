import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useAdminStore } from "../../store/useAdminStore";

function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const { admin, doctors, loading, adminProfile, allPendingDoctors } =
    useAdminStore();

  // Load admin profile + pending doctors on mount
  useEffect(() => {
    if (user?._id) {
      adminProfile(user._id);
    }
    allPendingDoctors();
  }, [user?._id]);

  const displayName =
    admin?.name || user?.name || user?.fullName || "Administrator";
  const displayEmail = admin?.email || user?.email || "";
  const pendingCount = doctors?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest block mb-1">
            CarePulse Command Center
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            Hospital Administration Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as{" "}
            <span className="font-semibold text-slate-700">{displayName}</span>
            {displayEmail && (
              <span className="text-slate-400"> ({displayEmail})</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/pending-doctors"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            🩺 Verify Doctor Applications
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Hospital Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">
            Pending Doctor Approvals
          </span>
          {loading ? (
            <p className="text-2xl font-bold text-slate-400 mt-1 animate-pulse">
              Loading…
            </p>
          ) : (
            <p className="text-2xl font-bold text-amber-600 mt-1">
              {pendingCount} Pending
            </p>
          )}
          <span className="text-xs text-amber-700 font-medium">
            Requires credential verification
          </span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">
            Total Active Doctors
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">28 Doctors</p>
          <span className="text-xs text-emerald-600 font-medium">
            Across 8 departments
          </span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">
            Total Registered Patients
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            1,248 Patients
          </p>
          <span className="text-xs text-blue-600 font-medium">
            +42 this month
          </span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">
            Total Hospital Appointments
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">3,480 Visits</p>
          <span className="text-xs text-slate-500 font-medium">
            98.4% fulfillment rate
          </span>
        </div>
      </div>

      {/* Quick Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              👨‍⚕️ Doctor Governance
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Review doctor profiles, activate approved medical staff, update
              licenses, and manage hospital rosters.
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
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              👥 Patient Directory
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Access emergency contacts, blood group registries, patient
              profiles, and medical visit histories.
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
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              📅 Central Scheduling
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Monitor OPD bookings across cardiology, neurology, pediatrics,
              orthopedics, and emergency wards.
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

      {/* Admin Account Info Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 text-sm mb-3">
          🔐 My Admin Account
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Name</span>
            <span className="font-semibold text-slate-800">{displayName}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Email</span>
            <span className="font-semibold text-slate-800">
              {displayEmail || "—"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Role</span>
            <span className="inline-flex items-center gap-1 font-semibold text-purple-700">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>
              {admin?.role || user?.role || "Admin"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
