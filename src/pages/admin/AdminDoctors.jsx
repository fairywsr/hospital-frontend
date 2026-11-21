import { useEffect, useState } from "react";
import { useDoctorStore } from "../../store/userDoctorStore";

function AdminDoctors() {
  const {
    allDoctors,
    loading,
    error,
    getAllDoctors,
    approveDoctor,
    rejectDoctor,
  } = useDoctorStore();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await approveDoctor(id);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      await rejectDoctor(id);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = allDoctors.filter((doc) => {
    const name = doc.name || doc.fullName || "";
    const email = doc.email || "";
    const spec = doc.specilization || doc.specialization || "";
    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      spec.toLowerCase().includes(search.toLowerCase());

    const status = doc.profileStatus || doc.status || "Pending";
    const matchStatus = filterStatus === "All" || status === filterStatus;

    return matchSearch && matchStatus;
  });

  const statusCounts = {
    All: allDoctors.length,
    Approved: allDoctors.filter(
      (d) => (d.profileStatus || d.status) === "Approved",
    ).length,
    Pending: allDoctors.filter(
      (d) => (d.profileStatus || d.status) === "Pending",
    ).length,
    Rejected: allDoctors.filter(
      (d) => (d.profileStatus || d.status) === "Rejected",
    ).length,
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest block mb-1">
              Doctor Management
            </span>
            <h1 className="text-2xl font-bold text-slate-900">All Doctors</h1>
            <p className="text-xs text-slate-500 mt-1">
              View, verify, and manage all registered physicians across the
              hospital.
            </p>
          </div>
          <button
            onClick={() => getAllDoctors()}
            disabled={loading}
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Refreshing…
              </>
            ) : (
              <>🔄 Refresh</>
            )}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(statusCounts).map(([label, count]) => (
          <button
            key={label}
            onClick={() => setFilterStatus(label)}
            className={`bg-white rounded-xl border p-4 shadow-sm text-left transition-all ${
              filterStatus === label
                ? "border-purple-500 ring-2 ring-purple-200"
                : "border-slate-200 hover:border-purple-300"
            }`}
          >
            <span className="text-[11px] text-slate-500 font-medium block">
              {label}
            </span>
            <span className="text-2xl font-bold text-slate-900 mt-0.5 block">
              {count}
            </span>
            <span className="text-[10px] text-slate-400">
              {label === "All"
                ? "Total registered"
                : `${label.toLowerCase()} status`}
            </span>
          </button>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or specialization…"
            className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white transition-all"
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
          <button
            onClick={() => getAllDoctors()}
            className="ml-auto text-xs font-semibold text-red-600 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && allDoctors.length === 0 && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-2.5 bg-slate-100 rounded w-1/2"></div>
                </div>
                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">👨‍⚕️</div>
          <h3 className="text-base font-semibold text-slate-700 mb-1">
            {allDoctors.length === 0
              ? "No doctors found"
              : "No results match your filter"}
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {allDoctors.length === 0
              ? "No doctors have registered yet. They will appear here once they sign up."
              : "Try changing your search term or status filter."}
          </p>
          {allDoctors.length === 0 && (
            <button
              onClick={() => getAllDoctors()}
              className="mt-4 text-xs font-semibold text-purple-600 hover:underline"
            >
              Reload
            </button>
          )}
        </div>
      )}

      {/* Doctor Cards */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((doc) => {
            const name = doc.name || doc.fullName || "—";
            const email = doc.email || "—";
            const phone = doc.phone || "—";
            const spec = doc.specilization || doc.specialization || "—";
            const status = doc.profileStatus || doc.status || "Pending";
            const license = doc.license || doc.licenseNumber || "—";
            const experience = doc.experience || doc.experienceYears || "—";
            const fee = doc.consultationFee || "—";
            const gender = doc.gender || "—";
            const age = doc.age || "—";

            const initials = name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <div
                key={doc._id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0">
                    {initials}
                  </div>

                  {/* Info Grid */}
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Name</span>
                      <span className="font-semibold text-slate-800">
                        {name}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email</span>
                      <span className="font-medium text-slate-700 break-all">
                        {email}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Phone</span>
                      <span className="font-medium text-slate-700">
                        {phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">
                        Specialization
                      </span>
                      <span className="font-medium text-slate-700">{spec}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">License No.</span>
                      <span className="font-medium text-slate-700">
                        {license}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Experience</span>
                      <span className="font-medium text-slate-700">
                        {experience !== "—" ? `${experience} yrs` : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Gender / Age</span>
                      <span className="font-medium text-slate-700">
                        {gender} {age !== "—" ? `· ${age} yrs` : ""}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">
                        Consultation Fee
                      </span>
                      <span className="font-medium text-slate-700">
                        {fee !== "—" ? `$${fee}` : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Right side: status + actions */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(status)}`}
                    >
                      {status}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {status !== "Approved" && (
                        <button
                          onClick={() => handleApprove(doc._id)}
                          disabled={actionLoading === doc._id}
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all disabled:opacity-60"
                        >
                          {actionLoading === doc._id ? "…" : "Approve"}
                        </button>
                      )}
                      {status !== "Rejected" && (
                        <button
                          onClick={() => handleReject(doc._id)}
                          disabled={actionLoading === doc._id}
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-600 text-red-700 hover:text-white transition-all disabled:opacity-60"
                        >
                          {actionLoading === doc._id ? "…" : "Reject"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Result count */}
      {!loading && allDoctors.length > 0 && (
        <p className="text-xs text-slate-400 text-right">
          Showing {filtered.length} of {allDoctors.length} doctors
        </p>
      )}
    </div>
  );
}

export default AdminDoctors;
