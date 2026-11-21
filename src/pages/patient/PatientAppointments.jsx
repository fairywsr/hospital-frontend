import { useEffect } from "react";
import { Link } from "react-router-dom";
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

function PatientAppointments() {
  const {
    appointments,
    loading,
    error,
    getPatientAppointment,
    cancelAppointment,
  } = useAppointmentStore();

  useEffect(() => {
    getPatientAppointment();
  }, [getPatientAppointment]);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await cancelAppointment(id);
    } catch {
      // error handled in store
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View and manage all your scheduled visits.
          </p>
        </div>
        <Link
          to="/patient/book-appointment"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          📅 Book New Appointment
        </Link>
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
      {!loading && appointments?.length === 0 && (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-600 font-semibold text-sm">
            No appointments yet
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Book your first appointment to get started.
          </p>
          <Link
            to="/patient/book-appointment"
            className="inline-flex items-center gap-1.5 mt-4 text-blue-600 text-xs font-semibold hover:underline"
          >
            Book Now →
          </Link>
        </div>
      )}

      {/* Appointments List */}
      {!loading && appointments?.length > 0 && (
        <div className="space-y-3">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left: doctor + details */}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Dr. {appt.doctor?.name || "—"}
                    </h3>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[appt.status] || "bg-slate-100 text-slate-600"}`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    🏥{" "}
                    {appt.doctor?.specilization ||
                      appt.doctor?.specialization ||
                      "General"}
                    &nbsp;•&nbsp;📞 {appt.doctor?.phone || "—"}
                  </p>
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
                  {appt.notes && (
                    <p className="text-xs text-slate-500 mt-1">
                      <span className="font-semibold">Doctor Notes:</span>{" "}
                      {appt.notes}
                    </p>
                  )}
                  {appt.rejectionReason && (
                    <p className="text-xs text-red-600 mt-1">
                      <span className="font-semibold">Rejection Reason:</span>{" "}
                      {appt.rejectionReason}
                    </p>
                  )}
                </div>

                {/* Right: fee + action */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Consultation Fee</p>
                    <p className="font-bold text-slate-900 text-sm">
                      {appt.consultationFee
                        ? `$${appt.consultationFee}`
                        : "TBD"}
                    </p>
                    <p
                      className={`text-[10px] font-semibold mt-0.5 ${PAYMENT_COLORS[appt.paymentStatus] || "text-slate-500"}`}
                    >
                      {appt.paymentStatus}
                    </p>
                  </div>

                  {/* Cancel only if Pending */}
                  {appt.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(appt._id)}
                      className="text-xs font-semibold px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientAppointments;
