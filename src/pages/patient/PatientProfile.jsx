import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { usePatientStore } from "../../store/usePatientStore";

const BLOOD_GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

function PatientProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const {
    user,
    loading,
    error,
    patientProfile,
    updateProfile,
    updatePassword,
    deleteProfile,
  } = usePatientStore();

  // Check if opened with ?edit=true
  const searchParams = new URLSearchParams(location.search);
  const shouldEdit = searchParams.get("edit") === "true";

  // ── Profile edit state ────────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(shouldEdit);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "O+",
    age: "",
    gender: "Male",
    disease: "",
    address: "",
    emergencyContact: "",
  });
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

  // ── Delete confirmation state ─────────────────────────────────────────────────
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Fetch profile once on mount
  useEffect(() => {
    const id = authUser?._id || authUser?.id;
    if (id && !user) {
      patientProfile(id);
    }
  }, [authUser, user, patientProfile]);

  // Sync form data whenever store user data is available
  useEffect(() => {
    const current = user || authUser;
    if (current) {
      setFormData({
        name: current.name || current.fullName || "",
        email: current.email || "",
        phone: current.phone ? String(current.phone) : "",
        bloodGroup: current.bloodGroup || "O+",
        age: current.age ? String(current.age) : "",
        gender: current.gender || "Male",
        disease: current.disease || "",
        address: current.address || "",
        emergencyContact: current.emergencyContact
          ? String(current.emergencyContact)
          : "",
      });
    }
  }, [user, authUser]);

  const patient = user || authUser;

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
    if (!id) {
      setProfileError("Patient ID not found. Please log in again.");
      setSavingProfile(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone ? Number(formData.phone) : undefined,
        bloodGroup: formData.bloodGroup,
        age: formData.age ? String(formData.age) : undefined,
        gender: formData.gender,
        disease: formData.disease?.trim() || "General Consultation",
        address: formData.address?.trim() || undefined,
        emergencyContact: formData.emergencyContact
          ? Number(formData.emergencyContact)
          : undefined,
      };

      await updateProfile(id, payload);
      setProfileMsg("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setProfileError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update profile.",
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

    if (!pwForm.oldPassword) {
      setPwError("Current password is required.");
      return;
    }

    if (pwForm.newPassword.length < 6) {
      setPwError("New password must be at least 6 characters long.");
      return;
    }

    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError("New password and confirm password do not match.");
      return;
    }

    setSavingPw(true);
    try {
      await updatePassword({
        oldPassword: pwForm.oldPassword,
        newPassword: pwForm.newPassword,
      });
      setPwMsg("Password updated successfully!");
      setPwForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update password.",
      );
    } finally {
      setSavingPw(false);
    }
  };

  const handleDeleteProfile = async () => {
    const id = authUser?._id || authUser?.id;
    if (!id) return;

    setDeleting(true);
    setDeleteError("");
    try {
      await deleteProfile(id);
      navigate("/patient/login");
    } catch (err) {
      setDeleteError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete profile.",
      );
      setDeleting(false);
    }
  };

  if (loading && !patient) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400 text-sm animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  const displayName = patient?.name || patient?.fullName || "Patient";
  const initial = (displayName[0] || "P").toUpperCase();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Patient Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          View and update your personal health record and account information
        </p>
      </div>

      {/* Global store error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* ── Profile Header Card ──────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {initial}
            </div>
            <div>
              <p className="text-white font-bold text-lg">{displayName}</p>
              <p className="text-blue-100 text-xs mt-0.5">
                {patient?.email || "—"} • Blood Group:{" "}
                {patient?.bloodGroup || "—"}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white border border-white/30">
            {patient?.role || "Patient"}
          </span>
        </div>

        <div className="p-6">
          {/* Profile success/error banners */}
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
            /* ── Edit Form Mode ──────────────────────────────────────────────── */
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
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
                    min="1"
                    max="120"
                    placeholder="e.g. 28"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                  >
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Reason / Condition
                  </label>
                  <input
                    type="text"
                    name="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    placeholder="e.g. General Consultation, Hypertension"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {savingProfile ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
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
            /* ── Read-Only Details View ──────────────────────────────────────── */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Full Name", value: displayName },
                  { label: "Email Address", value: patient?.email },
                  { label: "Phone Number", value: patient?.phone },
                  { label: "Blood Group", value: patient?.bloodGroup },
                  {
                    label: "Age",
                    value: patient?.age ? `${patient.age} yrs` : null,
                  },
                  { label: "Gender", value: patient?.gender },
                  { label: "Reason / Condition", value: patient?.disease },
                  { label: "Account Role", value: patient?.role || "Patient" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-slate-50/70 p-3 rounded-xl border border-slate-100"
                  >
                    <span className="text-xs text-slate-500 font-medium">
                      {label}
                    </span>
                    <p className="font-semibold text-slate-900 mt-0.5">
                      {value || "—"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all shadow-sm"
                >
                  ✏️ Edit Profile
                </button>
                <span className="text-xs text-slate-400">
                  Last updated from health record
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Change Password Card ──────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-800 mb-1">
          🔒 Change Password
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Update your password to keep your medical account secure
        </p>

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
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="oldPassword"
              value={pwForm.oldPassword}
              onChange={handlePwChange}
              placeholder="Enter current password"
              className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={pwForm.newPassword}
                onChange={handlePwChange}
                placeholder="Min. 6 characters"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={pwForm.confirmPassword}
                onChange={handlePwChange}
                placeholder="Repeat new password"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingPw}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {savingPw ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Updating Password...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>

      {/* ── Danger Zone: Delete Account ───────────────────────────────────────── */}
      <div className="bg-white border border-red-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-bold text-red-600 mb-1">⚠️ Danger Zone</h2>
        <p className="text-xs text-slate-500 mb-4">
          Once you delete your patient profile, all your appointment history and
          profile details will be permanently removed.
        </p>

        {deleteError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            ❌ {deleteError}
          </div>
        )}

        {showDeleteConfirm ? (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl space-y-3">
            <p className="text-xs font-semibold text-red-800">
              Are you absolutely sure you want to delete your patient account?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDeleteProfile}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Yes, Delete My Account"}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all"
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}

export default PatientProfile;
