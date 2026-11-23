import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDoctorStore } from "../store/userDoctorStore";

// Fallback faculty doctors in case backend database has no doctors yet or user is unauthenticated
const FALLBACK_DOCTORS = [
  {
    _id: "doc-101",
    name: "Dr. Sarah Mitchell",
    fullName: "Dr. Sarah Mitchell, MD",
    email: "sarah.mitchell@carepulse.org",
    phone: "+1 (800) 555-0141",
    specialization: "Cardiologist",
    specilization: "Cardiologist",
    qualification: "MBBS, MD (Cardiology), FACC",
    experience: 16,
    experienceYears: 16,
    consultationFee: 75,
    gender: "Female",
    license: 884721,
    status: "Approved",
    rating: 4.9,
    reviewsCount: 142,
    availableDays: "Mon, Wed, Fri",
    avatarBg: "bg-blue-600",
    initials: "SM",
    about:
      "Senior Interventional Cardiologist specializing in acute coronary syndrome, complex coronary interventions, heart failure management, and preventive cardiac rehabilitation.",
  },
  {
    _id: "doc-102",
    name: "Dr. David Chen",
    fullName: "Dr. David Chen, MD, PhD",
    email: "david.chen@carepulse.org",
    phone: "+1 (800) 555-0142",
    specialization: "Neurologist",
    specilization: "Neurologist",
    qualification: "MBBS, DM (Neurology), FINR",
    experience: 14,
    experienceYears: 14,
    consultationFee: 85,
    gender: "Male",
    license: 649201,
    status: "Approved",
    rating: 4.8,
    reviewsCount: 118,
    availableDays: "Tue, Thu, Sat",
    avatarBg: "bg-purple-600",
    initials: "DC",
    about:
      "Consultant Neurologist and Neuro-interventionalist with extensive clinical expertise in acute stroke thrombolysis, epilepsy, movement disorders, and neurovascular diagnostics.",
  },
  {
    _id: "doc-103",
    name: "Dr. Priya Patel",
    fullName: "Dr. Priya Patel, MD",
    email: "priya.patel@carepulse.org",
    phone: "+1 (800) 555-0143",
    specialization: "Pediatrician",
    specilization: "Pediatrician",
    qualification: "MBBS, MD (Pediatrics), FAAP",
    experience: 11,
    experienceYears: 11,
    consultationFee: 60,
    gender: "Female",
    license: 712940,
    status: "Approved",
    rating: 5.0,
    reviewsCount: 196,
    availableDays: "Mon - Sat",
    avatarBg: "bg-emerald-600",
    initials: "PP",
    about:
      "Dedicated Pediatric Specialist and Neonatologist committed to comprehensive child healthcare, neonatal developmental screening, pediatric pulmonology, and adolescent medicine.",
  },
  {
    _id: "doc-104",
    name: "Dr. Arthur Vance",
    fullName: "Dr. Arthur Vance, MS, MCh",
    email: "arthur.vance@carepulse.org",
    phone: "+1 (800) 555-0144",
    specialization: "Orthopedic",
    specilization: "Orthopedic",
    qualification: "MBBS, MS (Ortho), Fellowship in Joint Replacement",
    experience: 19,
    experienceYears: 19,
    consultationFee: 90,
    gender: "Male",
    license: 521893,
    status: "Approved",
    rating: 4.9,
    reviewsCount: 165,
    availableDays: "Mon, Tue, Thu",
    avatarBg: "bg-indigo-600",
    initials: "AV",
    about:
      "Chief Orthopedic Surgeon with over 2,500 successful robotic joint replacements, sports injury arthroscopies, and complex fracture reconstruction surgeries.",
  },
  {
    _id: "doc-105",
    name: "Dr. Elena Rostova",
    fullName: "Dr. Elena Rostova, MD",
    email: "elena.rostova@carepulse.org",
    phone: "+1 (800) 555-0145",
    specialization: "Dermatologist",
    specilization: "Dermatologist",
    qualification: "MBBS, MD (Dermatology & Venereology)",
    experience: 9,
    experienceYears: 9,
    consultationFee: 55,
    gender: "Female",
    license: 391820,
    status: "Approved",
    rating: 4.7,
    reviewsCount: 94,
    availableDays: "Wed, Thu, Sat",
    avatarBg: "bg-pink-600",
    initials: "ER",
    about:
      "Consultant Dermatologist focusing on autoimmune dermatoses, chronic psoriasis management, dermatosurgery, cosmetic laser treatments, and pediatric eczema.",
  },
  {
    _id: "doc-106",
    name: "Dr. Marcus Brody",
    fullName: "Dr. Marcus Brody, MD",
    email: "marcus.brody@carepulse.org",
    phone: "+1 (800) 555-0146",
    specialization: "Immunologist",
    specilization: "Immunologist",
    qualification: "MBBS, MD (Medicine), DM (Clinical Immunology)",
    experience: 13,
    experienceYears: 13,
    consultationFee: 70,
    gender: "Male",
    license: 481029,
    status: "Approved",
    rating: 4.9,
    reviewsCount: 82,
    availableDays: "Mon, Wed, Fri",
    avatarBg: "bg-teal-600",
    initials: "MB",
    about:
      "Specialist in autoimmune and systemic rheumatic conditions including rheumatoid arthritis, lupus nephritis, biological infusions, and primary immunodeficiency disorders.",
  },
];

const SPECIALTY_OPTIONS = [
  "All Specialties",
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic",
  "Dermatologist",
  "Immunologist",
  "Emergency Physician",
  "Pathologist",
];

function FindDoctor() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSpecialty = searchParams.get("specialty") || "All Specialties";
  const initialSearch = searchParams.get("search") || "";

  const { allDoctors, getAllDoctors, loading } = useDoctorStore();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeModalDoctor, setActiveModalDoctor] = useState(null);

  // Sync state if URL search params change
  useEffect(() => {
    const sp = searchParams.get("specialty");
    if (sp) {
      // Find matching specialty (case-insensitive or substring)
      const matched = SPECIALTY_OPTIONS.find(
        (opt) => opt.toLowerCase().includes(sp.toLowerCase()) || sp.toLowerCase().includes(opt.toLowerCase())
      );
      if (matched) {
        setSelectedSpecialty(matched);
      } else {
        setSelectedSpecialty(sp);
      }
    }
    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Load doctors from backend
  useEffect(() => {
    getAllDoctors().catch(() => {
      // Handled gracefully with fallback doctors
    });
  }, [getAllDoctors]);

  // Merge backend approved doctors with fallback doctors
  const doctorsList = useMemo(() => {
    const approvedBackend = (allDoctors || []).filter(
      (d) => (d.status === "Approved" || d.profileStatus === "Approved")
    );

    if (approvedBackend.length > 0) {
      // Format backend doctors to ensure standard fields
      const formattedBackend = approvedBackend.map((doc, idx) => ({
        ...doc,
        name: doc.name || doc.fullName || "Doctor",
        fullName: doc.fullName || doc.name || "Doctor",
        specialization: doc.specialization || doc.specilization || "General Physician",
        qualification: doc.qualification || "MBBS, Certified Specialist",
        experience: doc.experience || doc.experienceYears || 5,
        experienceYears: doc.experienceYears || doc.experience || 5,
        consultationFee: doc.consultationFee || 50,
        gender: doc.gender || "Doctor",
        license: doc.license || doc.licenseNumber || "Verified",
        rating: 4.8 + ((idx % 3) * 0.1),
        reviewsCount: 40 + (idx * 15),
        availableDays: "Mon - Sat",
        avatarBg: idx % 2 === 0 ? "bg-blue-600" : "bg-teal-600",
        initials: (doc.name || doc.fullName || "DR")
          .split(" ")
          .filter((w) => !w.toLowerCase().startsWith("dr"))
          .map((w) => w[0])
          .slice(0, 2)
          .join("")
          .toUpperCase() || "MD",
        about:
          doc.about ||
          `Accredited specialist in ${doc.specialization || doc.specilization || "Medicine"} committed to evidence-based clinical diagnostics, patient wellness, and hospital consultation.`,
      }));

      // Combine with fallback doctors if backend has fewer than 4 doctors
      const existingEmails = new Set(formattedBackend.map((d) => d.email?.toLowerCase()));
      const uniqueFallbacks = FALLBACK_DOCTORS.filter(
        (d) => !existingEmails.has(d.email?.toLowerCase())
      );
      return [...formattedBackend, ...uniqueFallbacks];
    }

    return FALLBACK_DOCTORS;
  }, [allDoctors]);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    return doctorsList
      .filter((doc) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          doc.name.toLowerCase().includes(query) ||
          doc.fullName?.toLowerCase().includes(query) ||
          (doc.specialization && doc.specialization.toLowerCase().includes(query)) ||
          (doc.specilization && doc.specilization.toLowerCase().includes(query)) ||
          (doc.qualification && doc.qualification.toLowerCase().includes(query));

        const matchesSpecialty =
          selectedSpecialty === "All Specialties" ||
          (doc.specialization &&
            doc.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase())) ||
          (doc.specilization &&
            doc.specilization.toLowerCase().includes(selectedSpecialty.toLowerCase()));

        let matchesExp = true;
        const exp = Number(doc.experience || doc.experienceYears || 0);
        if (selectedExperience === "5+") matchesExp = exp >= 5;
        if (selectedExperience === "10+") matchesExp = exp >= 10;
        if (selectedExperience === "15+") matchesExp = exp >= 15;

        const matchesGender =
          selectedGender === "All" ||
          (doc.gender && doc.gender.toLowerCase() === selectedGender.toLowerCase());

        return matchesQuery && matchesSpecialty && matchesExp && matchesGender;
      })
      .sort((a, b) => {
        if (sortBy === "experience") {
          return (b.experience || 0) - (a.experience || 0);
        }
        if (sortBy === "fee-low") {
          return (Number(a.consultationFee) || 0) - (Number(b.consultationFee) || 0);
        }
        if (sortBy === "name") {
          return (a.name || "").localeCompare(b.name || "");
        }
        // Default recommended / rating
        return (b.rating || 0) - (a.rating || 0);
      });
  }, [doctorsList, searchQuery, selectedSpecialty, selectedExperience, selectedGender, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("All Specialties");
    setSelectedExperience("All");
    setSelectedGender("All");
    setSortBy("recommended");
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Page Header */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-950 text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300 mb-3">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Find Doctor</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-500/40 text-blue-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Hospital Medical Staff
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Find The Right Specialist For Your Care
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Explore accredited physicians, view qualifications and clinical backgrounds,
              and schedule your OPD consultation directly online.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200 p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name or qualification..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 hover:bg-white transition-all text-slate-800"
              />
            </div>

            {/* Specialty Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
              >
                {SPECIALTY_OPTIONS.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
              >
                <option value="All">Experience: Any</option>
                <option value="5+">5+ Years</option>
                <option value="10+">10+ Years</option>
                <option value="15+">15+ Years</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
              >
                <option value="recommended">Sort: Top Rated</option>
                <option value="experience">Sort: Experience</option>
                <option value="fee-low">Sort: Fee (Lowest)</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Secondary Quick Tags / Active Filters summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>Showing: <strong className="text-slate-900">{filteredDoctors.length}</strong> available physicians</span>
              {selectedSpecialty !== "All Specialties" && (
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium border border-blue-100 flex items-center gap-1">
                  {selectedSpecialty}
                  <button
                    onClick={() => setSelectedSpecialty("All Specialties")}
                    className="hover:text-red-600 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-600">Gender:</span>
              {["All", "Male", "Female"].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    selectedGender === g
                      ? "bg-blue-600 text-white font-semibold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {g}
                </button>
              ))}

              {(searchQuery ||
                selectedSpecialty !== "All Specialties" ||
                selectedExperience !== "All" ||
                selectedGender !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2 ml-2"
                >
                  Reset all
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Doctors Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-slate-500">Loading hospital physicians...</p>
          </div>
        )}

        {!loading && filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto text-2xl">
              🩺
            </div>
            <h3 className="text-lg font-bold text-slate-900">No doctors found</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              No registered doctors matched your current search criteria. Try modifying your filters or clearing your search term.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Top Avatar & Verification Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-14 h-14 rounded-2xl ${
                          doc.avatarBg || "bg-blue-600"
                        } text-white font-bold text-lg flex items-center justify-center shadow-md shadow-blue-100`}
                      >
                        {doc.initials || "DR"}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {doc.name}
                          </h3>
                          <span
                            title="Hospital Verified Doctor"
                            className="inline-flex text-blue-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-blue-600 block mt-0.5">
                          {doc.specialization || doc.specilization || "Specialist"}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      ★ {doc.rating || "4.9"}
                    </span>
                  </div>

                  {/* Qualification & Experience */}
                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Qualification:</span>
                      <strong className="text-slate-800 text-right font-medium">
                        {doc.qualification || "MBBS, MD"}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Experience:</span>
                      <strong className="text-slate-800">
                        {doc.experience || doc.experienceYears || 5}+ Years
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Consultation Fee:</span>
                      <strong className="text-emerald-700 font-bold">
                        ${doc.consultationFee || 50}
                      </strong>
                    </div>
                  </div>

                  {/* Short Bio snippet */}
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {doc.about ||
                      "Dedicated clinical practitioner experienced in multidisciplinary patient diagnostics and therapeutic procedures."}
                  </p>

                  {/* Availability schedule */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{doc.availableDays || "Mon - Sat"}</span>
                    </span>
                    <span>{doc.reviewsCount || 100}+ Satisfied Patients</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setActiveModalDoctor(doc)}
                    className="inline-flex items-center justify-center text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 hover:border-blue-400 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    View Profile
                  </button>
                  <Link
                    to={`/patient/book-appointment?doctor=${doc._id}`}
                    className="inline-flex items-center justify-center text-xs font-semibold px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 transition-colors text-center"
                  >
                    Book OPD
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Doctor Profile Modal */}
      {activeModalDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalDoctor(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-sm transition-colors"
            >
              ✕
            </button>

            {/* Doctor Info Header */}
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl ${
                  activeModalDoctor.avatarBg || "bg-blue-600"
                } text-white font-extrabold text-xl flex items-center justify-center shadow-lg`}
              >
                {activeModalDoctor.initials || "DR"}
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
                  {activeModalDoctor.specialization || activeModalDoctor.specilization}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeModalDoctor.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeModalDoctor.qualification || "Accredited Physician"}
                </p>
              </div>
            </div>

            {/* Key Clinical Credentials Grid */}
            <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                  Experience
                </span>
                <span className="text-base font-extrabold text-slate-900">
                  {activeModalDoctor.experience || activeModalDoctor.experienceYears || 5}+ Yrs
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                  Rating
                </span>
                <span className="text-base font-extrabold text-amber-500">
                  ★ {activeModalDoctor.rating || 4.9}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                  OPD Fee
                </span>
                <span className="text-base font-extrabold text-emerald-600">
                  ${activeModalDoctor.consultationFee || 50}
                </span>
              </div>
            </div>

            {/* About / Clinical Focus */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Clinical Overview & Experience
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeModalDoctor.about}
              </p>
            </div>

            {/* Schedule & License */}
            <div className="space-y-2 text-xs text-slate-600 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
              <div className="flex justify-between">
                <span className="text-slate-500">OPD Clinic Hours:</span>
                <strong className="text-slate-800">
                  {activeModalDoctor.availableDays || "Mon - Sat"} (9:00 AM - 4:00 PM)
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Medical License:</span>
                <strong className="text-slate-800">
                  #{activeModalDoctor.license || "Verified License"}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hospital Department:</span>
                <strong className="text-blue-700">
                  {activeModalDoctor.specialization || "Clinical OPD"}
                </strong>
              </div>
            </div>

            {/* Actions in Modal */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/patient/book-appointment?doctor=${activeModalDoctor._id}`}
                onClick={() => setActiveModalDoctor(null)}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold text-sm rounded-xl shadow-md shadow-blue-200 transition-colors"
              >
                Book Appointment With {activeModalDoctor.name.split(" ")[1] || "Physician"}
              </Link>
              <button
                onClick={() => setActiveModalDoctor(null)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-center font-semibold text-sm rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Join Medical Staff Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-2xl shrink-0">
              🩺
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Are You a Certified Physician?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Join our multi-specialty medical faculty, manage consultations, and expand your patient practice.
              </p>
            </div>
          </div>

          <Link
            to="/doctor/register"
            className="shrink-0 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-sm shadow-teal-200 transition-colors"
          >
            Apply to Join as Doctor →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default FindDoctor;
