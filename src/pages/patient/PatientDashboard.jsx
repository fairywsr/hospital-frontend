import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { usePatientStore } from "../../store/usePatientStore";

function PatientDashboard() {
  const authUser = useAuthStore((state) => state.user);
  const { user, loading, error, patientProfile } = usePatientStore();

  // Fetch fresh profile from the server if we have an id
  useEffect(() => {
    const id = authUser?._id || authUser?.id;
    if (id && !user) {
      patientProfile(id);
    }
  }, [authUser, user, patientProfile]);

  // Merge auth-store snapshot with patient-store data (patient-store is more up-to-date)
  const patient = user || authUser;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
            Patient Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Welcome back,{" "}
            {loading
              ? "..."
              : patient?.name || patient?.fullName || "Patient"}
            !
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Manage your medical appointments, review laboratory test results,
            and connect with clinical specialists.
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

      {/* Error Banner */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Blood Group</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {patient?.bloodGroup || "—"}
          </p>
          <span className="text-xs text-emerald-600 font-medium">On Record</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Age</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {patient?.age ? `${patient.age} yrs` : "—"}
          </p>
          <span className="text-xs text-slate-500 font-medium">
            Gender: {patient?.gender || "—"}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">
            Reason / Condition
          </span>
          <p className="text-lg font-bold text-slate-900 mt-1 truncate">
            {patient?.disease || "—"}
          </p>
          <span className="text-xs text-blue-600 font-medium">Primary visit reason</span>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-800 mb-4">
          👤 Patient Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-500 font-medium">Full Name</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {patient?.name || patient?.fullName || "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Email</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {patient?.email || "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Phone</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {patient?.phone || "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Role</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {patient?.role || "Patient"}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <Link
            to="/patient/profile"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Edit Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
