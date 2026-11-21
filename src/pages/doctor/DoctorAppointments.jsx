import { useEffect, useState } from "react";
import { useAppointmentStore } from "../../store/useAppointmentStore";

const STATUS_COLORS = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Cancelled: "bg-slate-100 text-slate-600 border-slate-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
};

const ALL_STATUSES = ["All", "Pending", "Approved", "Rejected", "Cancelled", "Completed"];

function DoctorAppointments() {
  const {
    appointments,
    loading,
    error,
    getDoctorAppointment,
    approveAppointmentStatus,
    rejectAppointmentStatus,
    cancelAppointment,
  } = useAppointmentStore();

  const [filter, setFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    getDoctorAppointment();
  }, [getDoctorAppointment]);

  const filtered =
    filter === "All"
      ? appointments
      : appointments?.filter((a) => a.status === filter);

  const handleAction = async (action, id) => {
    setActionLoading(id + action);
    try {
      if (action === "approve") await approveAppointmentStatus(id);
      else if (action === "reject") await rejectAppointmentStatus(id);
      else if (action === "cancel") await cancelAppointment(id);
    } catch {
      // error shown from store
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Patient Appointments Queue
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage all incoming appointment requests from patients.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === s
                ? "bg-teal-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {s}
            {s !== "All" && (
              <span className="ml-1 text-[10px] opacity-70">
                ({appointments?.filter((a) => a.status === s).length ?? 0})
              </span>
            )}
          </button>
        ))}
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
      {!loading && (!filtered || filtered.length === 0) && (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-600 font-semibold text-sm">
            No {filter !== "All" ? filter.toLowerCase() : ""} appointments found
          </p>
        </div>
      )}

      {/* Appointment Cards */}
      {!loading && filtered?.length > 0 && (
        <div className="space-y-3">
          {filtered.map((appt) => (
            <div
              key={appt._id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left: patient + details */}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {appt.patient?.name || "Unknown Patient"}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[appt.status] || "bg-slate-100 text-slate-600"}`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    📧 {appt.patient?.email || "—"}&nbsp;•&nbsp;📞{" "}
                    {appt.patient?.phone || "—"}
                  </p>
                  {appt.patient?.age && (
                    <p className="text-xs text-slate-500">
                      Age: {appt.patient.age}&nbsp;•&nbsp;Condition:{" "}
                      {appt.patient?.disease || "—"}
                    </p>
                  )}
                  <p className="text-xs text-slate-700 font-medium mt-2">
                    📅{" "}
                    {new Date(appt.appointmentDate).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    <span className="font-semibold">Reason:</span> {appt.reason}
                  </p>
                </div>

                {/* Right: actions */}
                {appt.status === "Pending" && (
                  <div className="flex items-center gap-2 shrink-0 self-start">
                    <button
                      disabled={!!actionLoading}
                      onClick={() => handleAction("approve", appt._id)}
                      className="text-xs font-semibold px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all disabled:opacity-50"
                    >
                      {actionLoading === appt._id + "approve"
                        ? "…"
                        : "✅ Approve"}
                    </button>
                    <button
                      disabled={!!actionLoading}
                      onClick={() => handleAction("reject", appt._id)}
                      className="text-xs font-semibold px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all disabled:opacity-50"
                    >
                      {actionLoading === appt._id + "reject"
                        ? "…"
                        : "❌ Reject"}
                    </button>
                    <button
                      disabled={!!actionLoading}
                      onClick={() => handleAction("cancel", appt._id)}
                      className="text-xs font-semibold px-3 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg transition-all disabled:opacity-50"
                    >
                      {actionLoading === appt._id + "cancel" ? "…" : "Cancel"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;
