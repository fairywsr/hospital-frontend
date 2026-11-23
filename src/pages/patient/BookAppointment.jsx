import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import { useDoctorStore } from "../../store/userDoctorStore";

const STATUS_COLORS = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Cancelled: "bg-slate-100 text-slate-600 border-slate-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
};

function BookAppointment() {
  const navigate = useNavigate();
  const { createNewAppointment, loading, error } = useAppointmentStore();
  const { getAllDoctors, allDoctors } = useDoctorStore();
  const [form, setForm] = useState({
    doctor: "",
    appointmentDate: "",
    reason: "",
  });
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    getAllDoctors();
  }, [getAllDoctors]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    if (!form.doctor || !form.appointmentDate || !form.reason.trim()) {
      setFormError("All fields are required.");
      return;
    }

    try {
      await createNewAppointment(form);
      setSuccess("Appointment booked successfully!");
      setForm({ doctor: "", appointmentDate: "", reason: "" });
      setTimeout(() => navigate("/patient/appointments"), 1500);
    } catch {
      // error shown from store
    }
  };

  // Min date = today (ISO string sliced to datetime-local format)
  const minDate = new Date().toISOString().slice(0, 16);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Book Appointment</h1>
        <p className="text-sm text-slate-500 mt-1">
          Schedule a consultation with one of our registered physicians.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        {(error || formError) && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            ⚠️ {formError || error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Doctor Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Doctor <span className="text-red-500">*</span>
            </label>
            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Choose a physician --</option>
              {allDoctors
                .filter((d) => d.status === "Approved")
                .map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    Dr. {doc.name} — {doc.specilization || doc.specialization}
                  </option>
                ))}
            </select>
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Appointment Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="appointmentDate"
              value={form.appointmentDate}
              min={minDate}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Reason for Visit <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={4}
              maxLength={500}
              placeholder="Describe your symptoms or the purpose of your visit…"
              className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-right text-[10px] text-slate-400 mt-0.5">
              {form.reason.length}/500
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl text-sm transition-all"
          >
            {loading ? "Booking…" : "📅 Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
