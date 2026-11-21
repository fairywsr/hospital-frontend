import { useEffect, useState } from "react";
import { useAppointmentStore } from "../../store/useAppointmentStore";

const STATUS_COLORS = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Cancelled: "bg-slate-100 text-slate-600 border-slate-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
};

const PAYMENT_COLORS = {
  Pending: "text-amber-600",
  Paid: "text-emerald-600",
  Refunded: "text-blue-600",
};

const ALL_STATUSES = ["All", "Pending", "Approved", "Rejected", "Cancelled", "Completed"];
const STATUS_OPTIONS = ["Pending", "Approved", "Rejected", "Cancelled", "Completed"];

function AdminAppointments() {
  const {
    appointments,
    loading,
    error,
    allAppointments,
    updateAppointmentStatus,
    deleteAppointment,
  } = useAppointmentStore();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    allAppointments();
  }, [allAppointments]);

  const filtered = (appointments || [])
    .filter((a) => (filter === "All" ? true : a.status === filter))
    .filter((a) => {
      const q = search.toLowerCase();
      return (
        !q ||
        a.patient?.name?.toLowerCase().includes(q) ||
        a.doctor?.name?.toLowerCase().includes(q) ||
        a.reason?.toLowerCase().includes(q)
      );
    });

  const handleStatusChange = async (id, status) => {
    setActionLoading(id);
    try {
      await updateAppointmentStatus(id, status);
    } catch {
      // error shown from store
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(id + "del");
    try {
      await deleteAppointment(id);
      setConfirmDelete(null);
    } catch {
      // error shown from store
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Hospital Appointments
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor and manage all patient appointments across departments.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-center">
          <p className="text-xs text-purple-500 font-medium">Total</p>
          <p className="text-2xl font-bold text-purple-700">
            {appointments?.length ?? 0}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {STATUS_OPTIONS.map((s) => {
          const count = (appointments || []).filter(
            (a) => a.status === s,
          ).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? "All" : s)}
              className={`rounded-xl p-3 border text-left transition-all ${
                filter === s ? "ring-2 ring-purple-500" : ""
              } ${STATUS_COLORS[s] || "bg-slate-50 border-slate-200"}`}
            >
              <p className="text-[10px] font-semibold opacity-80">{s}</p>
              <p className="text-xl font-bold">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient, doctor, or reason…"
          className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-slate-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-slate-400 text-sm animate-pulse">
          Loading appointments…
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-600 font-semibold text-sm">
            No appointments match your filter
          </p>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <h2 className="font-bold text-slate-900">Delete Appointment?</h2>
            <p className="text-xs text-slate-500">
              This action is irreversible. The appointment record will be
              permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                disabled={!!actionLoading}
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-semibold text-white transition disabled:opacity-50"
              >
                {actionLoading === confirmDelete + "del"
                  ? "Deleting…"
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table (desktop) / Cards (mobile) */}
      {!loading && filtered.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden lg:block bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {[
                    "Patient",
                    "Doctor",
                    "Date",
                    "Reason",
                    "Status",
                    "Payment",
                    "Fee",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left font-semibold text-slate-600 px-4 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((appt) => (
                  <tr key={appt._id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {appt.patient?.name || "—"}
                      <div className="text-slate-400 font-normal">
                        {appt.patient?.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      Dr. {appt.doctor?.name || "—"}
                      <div className="text-slate-400">
                        {appt.doctor?.specilization ||
                          appt.doctor?.specialization}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                      {new Date(appt.appointmentDate).toLocaleDateString(
                        "en-US",
                        { dateStyle: "medium" },
                      )}
                      <div className="text-slate-400">
                        {new Date(appt.appointmentDate).toLocaleTimeString(
                          "en-US",
                          { timeStyle: "short" },
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">
                      {appt.reason}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[appt.status]}`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${PAYMENT_COLORS[appt.paymentStatus]}`}
                    >
                      {appt.paymentStatus}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {appt.consultationFee
                        ? `$${appt.consultationFee}`
                        : "TBD"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* Status Selector */}
                        <select
                          value={appt.status}
                          disabled={actionLoading === appt._id}
                          onChange={(e) =>
                            handleStatusChange(appt._id, e.target.value)
                          }
                          className="text-[10px] border border-slate-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => setConfirmDelete(appt._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded transition"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-3">
            {filtered.map((appt) => (
              <div
                key={appt._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {appt.patient?.name || "—"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {appt.patient?.email}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[appt.status]}`}
                  >
                    {appt.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-0.5">
                  <p>
                    👨‍⚕️ Dr. {appt.doctor?.name} —{" "}
                    {appt.doctor?.specilization || appt.doctor?.specialization}
                  </p>
                  <p>
                    📅{" "}
                    {new Date(appt.appointmentDate).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p>
                    <span className="font-semibold">Reason:</span> {appt.reason}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                  <select
                    value={appt.status}
                    disabled={actionLoading === appt._id}
                    onChange={(e) =>
                      handleStatusChange(appt._id, e.target.value)
                    }
                    className="flex-1 text-xs border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setConfirmDelete(appt._id)}
                    className="text-red-500 hover:text-red-700 p-1.5 border border-red-200 rounded-lg transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminAppointments;
