import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useDoctorStore } from "../../store/userDoctorStore";

function DoctorDashboard() {
  const authUser = useAuthStore((state) => state.user);
  const { doctor, loading, error, doctorProfile } = useDoctorStore();

  // Fetch fresh profile from the server if we have an id
  useEffect(() => {
    const id = authUser?._id || authUser?.id;
    if (id && !doctor) {
      doctorProfile(id);
    }
  }, [authUser, doctor, doctorProfile]);

  // Merge auth-store snapshot with doctor-store data (doctor-store is more up-to-date)
  const doc = doctor || authUser;

  // Approval status badge colour
  const statusColor =
    doc?.status === "Approved"
      ? "text-emerald-400"
      : doc?.status === "Rejected"
      ? "text-red-400"
      : "text-amber-400";

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Physician Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Welcome, Dr.{" "}
            {loading ? "..." : doc?.name || doc?.fullName || "Physician"}!
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Specialization:{" "}
            <strong className="text-teal-300">
              {doc?.specilization || doc?.specialization || "—"}
            </strong>{" "}
            • License:{" "}
            <strong className="text-teal-300">{doc?.license || "—"}</strong>
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

      {/* Error Banner */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Experience</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {doc?.experience != null ? `${doc.experience} yrs` : "—"}
          </p>
          <span className="text-xs text-teal-600 font-medium">Clinical Practice</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Age</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {doc?.age != null ? `${doc.age} yrs` : "—"}
          </p>
          <span className="text-xs text-slate-500 font-medium">
            Gender: {doc?.gender || "—"}
          </span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Phone</span>
          <p className="text-xl font-bold text-slate-900 mt-1 truncate">
            {doc?.phone || "—"}
          </p>
          <span className="text-xs text-blue-600 font-medium">Contact</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Profile Status</span>
          <p className={`text-2xl font-bold mt-1 ${statusColor}`}>
            {doc?.status || "Pending"}
          </p>
          <span className="text-xs text-slate-500 font-medium">Admin Approval</span>
        </div>
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-800 mb-4">
          👨‍⚕️ Physician Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-500 font-medium">Full Name</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {doc?.name || doc?.fullName || "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Email</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {doc?.email || "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Specialization</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {doc?.specilization || doc?.specialization || "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">License No.</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {doc?.license || "—"}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Role</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {doc?.role || "Doctor"}
            </p>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Profile Status</span>
            <p className={`font-semibold mt-0.5 ${statusColor}`}>
              {doc?.status || "Pending"}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <Link
            to="/doctor/profile"
            className="text-xs font-semibold text-teal-600 hover:underline"
          >
            Edit Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
