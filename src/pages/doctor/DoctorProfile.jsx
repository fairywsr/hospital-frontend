import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useDoctorStore } from "../../store/userDoctorStore";

const SPECIALIZATIONS = [
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Dermatologist",
  "Immunologist",
];

function DoctorProfile() {
  const authUser = useAuthStore((state) => state.user);
  const { doctor, loading, error, doctorProfile, editProfile, updatePassword } =
    useDoctorStore();
  const navigate = useNavigate();

  // ── Profile edit state ────────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // ── Password change state ─────────────────────────────────────────────────────
  const [pwForm, setPwForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  // Fetch profile once on mount
  useEffect(() => {
    const id = authUser?._id || authUser?.id;
    if (id && !doctor) {
      doctorProfile(id);
    }
  }, [authUser, doctor, doctorProfile]);

  // Keep form in sync whenever doctor data arrives
  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
        specilization: doctor.specilization || "Cardiologist",
        license: doctor.license || "",
        age: doctor.age || "",
        experience: doctor.experience || "",
        gender: doctor.gender || "Male",
      });
    }
  }, [doctor]);

  const doc = doctor || authUser;

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileError("");
    setSavingProfile(true);
    const id = authUser?._id || authUser?.id;
    try {
      await editProfile(id, {
        ...formData,
        phone: Number(formData.phone),
        license: Number(formData.license),
        age: Number(formData.age),
        experience: Number(formData.experience),
      });
      setProfileMsg("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setProfileError(
        err?.response?.data?.message || err?.message || "Failed to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePwSave = async (e) => {
    e.preventDefault();
    setPwMsg("");
    setPwError("");
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError("New password and confirm password do not match.");
      return;
    }
    setSavingPw(true);
    try {
      await updatePassword(pwForm);
      setPwMsg("Password updated successfully!");
      setPwForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwError(
        err?.response?.data?.message || err?.message || "Failed to update password"
      );
    } finally {
      setSavingPw(false);
    }
  };

  if (loading && !doc) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400 text-sm animate-pulse">Loading profile...</div>
      </div>
    );
  }

  const statusColor =
    doc?.status === "Approved"
      ? "text-emerald-600 bg-emerald-50 border-emerald-200"
      : doc?.status === "Rejected"
      ? "text-red-600 bg-red-50 border-red-200"
      : "text-amber-600 bg-amber-50 border-amber-200";

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Doctor Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          View and manage your physician account details
        </p>
      </div>

      {/* Global error from store */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* ── Profile Card ─────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-teal-700 to-slate-800 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {(doc?.name || "D")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-white font-bold text-lg">
                Dr. {doc?.name || doc?.fullName || "—"}
              </p>
              <p className="text-teal-200 text-xs">
                {doc?.specilization || doc?.specialization || "—"} • License:{" "}
                {doc?.license || "—"}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor}`}
          >
            {doc?.status || "Pending"}
          </span>
        </div>

        <div className="p-6">
          {/* Profile success/error */}
          {profileMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
              ✅ {profileMsg}
            </div>
          )}
          {profileError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
              ❌ {profileError}
            </div>
          )}

          {editMode ? (
            /* ── Edit Form ─────────────────────────────────────────────────── */
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    License No.
                  </label>
                  <input
                    type="number"
                    name="license"
                    value={formData.license}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specialization
                  </label>
                  <select
                    name="specilization"
                    value={formData.specilization}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all bg-white"
                  >
                    {SPECIALIZATIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="25"
                    max="80"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Experience (yrs)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-all disabled:opacity-70"
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setProfileError("");
                  }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* ── Read-Only View ────────────────────────────────────────────── */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Full Name", value: doc?.name || doc?.fullName },
                  { label: "Email", value: doc?.email },
                  { label: "Phone", value: doc?.phone },
                  { label: "License No.", value: doc?.license },
                  {
                    label: "Specialization",
                    value: doc?.specilization || doc?.specialization,
                  },
                  { label: "Gender", value: doc?.gender },
                  { label: "Age", value: doc?.age ? `${doc.age} yrs` : null },
                  {
                    label: "Experience",
                    value: doc?.experience != null ? `${doc.experience} yrs` : null,
                  },
                  { label: "Role", value: doc?.role },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <span className="text-xs text-slate-500 font-medium">{label}</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{value || "—"}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setEditMode(true)}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-all"
                >
                  ✏️ Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Change Password Card ──────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-800 mb-4">🔒 Change Password</h2>

        {pwMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
            ✅ {pwMsg}
          </div>
        )}
        {pwError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            ❌ {pwError}
          </div>
        )}

        <form onSubmit={handlePwSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={pwForm.oldPassword}
              onChange={handlePwChange}
              placeholder="Enter current password"
              className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={pwForm.newPassword}
                onChange={handlePwChange}
                placeholder="Min. 6 characters"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={pwForm.confirmPassword}
                onChange={handlePwChange}
                placeholder="Repeat new password"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all placeholder:text-slate-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={savingPw}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 shadow-md transition-all disabled:opacity-70"
          >
            {savingPw ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DoctorProfile;
