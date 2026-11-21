import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePatientStore } from "../../store/usePatientStore";

function PatientRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "Male",
    age: "",
    dob: "",
    bloodGroup: "O+",
    disease: "General Consultation",
    address: "",
    emergencyContact: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const patientRegister = usePatientStore((state) => state.register);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "dob" && value) {
        const birthYear = new Date(value).getFullYear();
        if (!isNaN(birthYear)) {
          updated.age = String(Math.max(1, new Date().getFullYear() - birthYear));
        }
      }
      return updated;
    });
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setFormError("Please fill in all required fields (Full Name, Email, and Password).");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      let patientAge = formData.age;
      if (!patientAge && formData.dob) {
        const birthYear = new Date(formData.dob).getFullYear();
        if (!isNaN(birthYear)) {
          patientAge = String(Math.max(1, new Date().getFullYear() - birthYear));
        }
      }
      patientAge = patientAge ? String(patientAge) : "25";

      // Map to the exact fields accepted by the backend Patient model:
      // { name, email, phone, password, disease, age, gender, bloodGroup }
      const payload = {
        name: formData.fullName,           // schema field: "name"
        email: formData.email,
        password: formData.password,
        phone: Number(formData.phone) || undefined,
        gender: formData.gender || "Male",
        age: patientAge,
        disease: formData.disease?.trim() || "General Consultation",
        bloodGroup: formData.bloodGroup || "O+",
      };

      await patientRegister(payload);
      setSuccessMessage("Patient account created successfully! Redirecting to patient login...");

      setTimeout(() => {
        navigate("/patient/login");
      }, 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please check your information and try again.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Left Side: Patient Branding */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  Care<span className="text-blue-300">Pulse</span>
                </span>
                <span className="text-[10px] font-medium text-blue-200 uppercase tracking-widest block -mt-1">
                  Patient Health Network
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              Patient Registration
            </h2>
            <p className="text-sm text-blue-200 mb-6 leading-relaxed">
              Create your unified patient profile to schedule specialist consultations, check queue status, and store medical reports safely.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/10 border border-white/20">
                <p className="font-semibold text-white">📅 Easy OPD Appointments</p>
                <p className="text-blue-200 mt-1">Book slots with 50+ specialists in real-time.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/20">
                <p className="font-semibold text-white">📂 Digital Medical Records</p>
                <p className="text-blue-200 mt-1">Never lose prescriptions, vitals, or lab tests.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/20">
                <p className="font-semibold text-white">⚡ Emergency Quick Access</p>
                <p className="text-blue-200 mt-1">Save emergency contacts for fast hospital triage.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-blue-700/50 text-xs text-blue-200">
            <span>Already have a patient account? </span>
            <Link to="/patient/login" className="font-semibold text-white hover:text-blue-200 underline">
              Sign In here
            </Link>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Create Patient Account</h1>
                <p className="text-sm text-slate-500">
                  Fill in your health details to complete your patient profile
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Patient Registration
              </span>
            </div>

            {/* Error Notification */}
            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between">
                <span>{formError}</span>
                <button type="button" onClick={() => setFormError("")} className="text-red-400 hover:text-red-700">
                  ✕
                </button>
              </div>
            )}

            {/* Success Notification */}
            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
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
                    placeholder="john@example.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    required
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
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 6 characters"
                      className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Patient Health Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                  >
                    {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 28"
                    min="1"
                    max="120"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reason for Visit / Condition <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    placeholder="e.g. General Consultation, Checkup, Fever"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact</label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="+1 (555) 999-1111"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Apartment, Street, City, State"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-all disabled:opacity-70"
                >
                  {submitting ? "Registering Patient..." : "Create Patient Account"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Are you medical staff?{" "}
              <Link to="/doctor/register" className="text-teal-600 font-semibold hover:underline">
                Doctor Registration
              </Link>
            </span>
            <Link to="/admin/register" className="text-purple-600 font-semibold hover:underline">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientRegister;
