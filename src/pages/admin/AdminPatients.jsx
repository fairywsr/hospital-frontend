import { useEffect, useState } from "react";
import { usePatientStore } from "../../store/usePatientStore";

function AdminPatients() {
  const { patients, loading, error, getAllPatients } = usePatientStore();

  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("All");
  const [filterBloodGroup, setFilterBloodGroup] = useState("All");

  useEffect(() => {
    getAllPatients();
  }, []);

  const bloodGroups = ["All", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const filtered = (patients || []).filter((p) => {
    const name = p.name || p.fullName || "";
    const email = p.email || "";
    const phone = String(p.phone || "");
    const disease = p.disease || "";
    const bloodGroup = p.bloodGroup || "";
    const gender = p.gender || "";

    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      name.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q) ||
      phone.toLowerCase().includes(q) ||
      disease.toLowerCase().includes(q) ||
      bloodGroup.toLowerCase().includes(q);

    const matchGender = filterGender === "All" || gender === filterGender;
    const matchBlood = filterBloodGroup === "All" || bloodGroup === filterBloodGroup;

    return matchSearch && matchGender && matchBlood;
  });

  const totalPatients = patients?.length || 0;
  const maleCount = (patients || []).filter((p) => (p.gender || "").toLowerCase() === "male").length;
  const femaleCount = (patients || []).filter((p) => (p.gender || "").toLowerCase() === "female").length;
  const otherGenderCount = totalPatients - maleCount - femaleCount;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest block mb-1">
              Patient Directory
            </span>
            <h1 className="text-2xl font-bold text-slate-900">All Registered Patients</h1>
            <p className="text-xs text-slate-500 mt-1">
              Search, view, and inspect medical profiles, blood groups, and health records.
            </p>
          </div>
          <button
            onClick={() => getAllPatients()}
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

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[11px] text-slate-500 font-medium block">Total Patients</span>
          <span className="text-2xl font-bold text-slate-900 mt-0.5 block">{totalPatients}</span>
          <span className="text-[10px] text-slate-400">Total hospital records</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[11px] text-blue-600 font-medium block">Male Patients</span>
          <span className="text-2xl font-bold text-blue-700 mt-0.5 block">{maleCount}</span>
          <span className="text-[10px] text-slate-400">
            {totalPatients > 0 ? `${Math.round((maleCount / totalPatients) * 100)}% of total` : "0%"}
          </span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[11px] text-pink-600 font-medium block">Female Patients</span>
          <span className="text-2xl font-bold text-pink-700 mt-0.5 block">{femaleCount}</span>
          <span className="text-[10px] text-slate-400">
            {totalPatients > 0 ? `${Math.round((femaleCount / totalPatients) * 100)}% of total` : "0%"}
          </span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <span className="text-[11px] text-emerald-600 font-medium block">Showing Filtered</span>
          <span className="text-2xl font-bold text-emerald-700 mt-0.5 block">{filtered.length}</span>
          <span className="text-[10px] text-slate-400">Matching search criteria</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
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
            placeholder="Search by name, email, phone, disease, blood group…"
            className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400 bg-white"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white transition-all"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Other / Unspecified</option>
          </select>

          <select
            value={filterBloodGroup}
            onChange={(e) => setFilterBloodGroup(e.target.value)}
            className="text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white transition-all"
          >
            <option value="All">All Blood Groups</option>
            {bloodGroups.filter((b) => b !== "All").map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
          <button
            onClick={() => getAllPatients()}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && totalPatients === 0 && (
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
                <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">👥</div>
          <h3 className="text-base font-semibold text-slate-700 mb-1">
            {totalPatients === 0 ? "No patients registered yet" : "No matching patients found"}
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {totalPatients === 0
              ? "Patients who register through the Patient Portal will automatically appear here."
              : "Try adjusting your search query or clear your active filters."}
          </p>
          {totalPatients === 0 && (
            <button
              onClick={() => getAllPatients()}
              className="mt-4 text-xs font-semibold text-purple-600 hover:underline"
            >
              Reload
            </button>
          )}
        </div>
      )}

      {/* Patients List */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((patient) => {
            const name = patient.name || patient.fullName || "Unnamed Patient";
            const email = patient.email || "—";
            const phone = patient.phone || "—";
            const gender = patient.gender || "—";
            const age = patient.age || "—";
            const disease = patient.disease || "General Consultation";
            const bloodGroup = patient.bloodGroup || "—";
            const dateJoined = patient.createdAt
              ? new Date(patient.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : null;

            const initials = name
              .split(" ")
              .filter(Boolean)
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase() || "PT";

            return (
              <div
                key={patient._id || patient.email}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Avatar Icon */}
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                    {initials}
                  </div>

                  {/* Information Grid */}
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Patient Name</span>
                      <span className="font-semibold text-slate-800">{name}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Email Address</span>
                      <span className="font-medium text-slate-700 break-all">{email}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Contact Phone</span>
                      <span className="font-medium text-slate-700">{phone}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Blood Group</span>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        🩸 {bloodGroup}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block">Gender & Age</span>
                      <span className="font-medium text-slate-700">
                        {gender} {age !== "—" ? `· ${age} yrs` : ""}
                      </span>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block">Condition / Primary Complaint</span>
                      <span className="font-medium text-slate-800">{disease}</span>
                    </div>

                    {dateJoined && (
                      <div>
                        <span className="text-slate-400 block">Registered On</span>
                        <span className="font-medium text-slate-500">{dateJoined}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Badge */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                      Active Patient
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Counter footer */}
      {!loading && (patients || []).length > 0 && (
        <p className="text-xs text-slate-400 text-right">
          Showing {filtered.length} of {totalPatients} patients
        </p>
      )}
    </div>
  );
}

export default AdminPatients;
