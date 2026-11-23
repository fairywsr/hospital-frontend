import { useState } from "react";
import { Link } from "react-router-dom";

export const SPECIALTIES_DATA = [
  {
    id: "cardiology",
    name: "Cardiology & Heart Care",
    shortName: "Cardiologist",
    category: "Cardiovascular",
    badge: "24/7 Cath Lab",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    iconBg: "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white",
    desc: "Comprehensive cardiac interventions, preventive cardiology, coronary angioplasty, pacemaker implantations, and cardiac rehabilitation.",
    conditions: [
      "Coronary Artery Disease",
      "Heart Failure & Arrhythmia",
      "Hypertension & Lipid Disorders",
      "Valvular Heart Disease",
    ],
    procedures: ["Angiography & Stenting", "Echocardiogram (ECHO)", "Holter Monitoring", "Cardiac Bypass Rehab"],
    doctorsCount: "8 Specialists",
    openHours: "24/7 Emergency & OPD (Mon-Sat)",
  },
  {
    id: "neurology",
    name: "Neurology & Neurosurgery",
    shortName: "Neurologist",
    category: "Neuro & Spine",
    badge: "Stroke Ready Unit",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    desc: "Advanced neurovascular diagnostics, microsurgical brain tumor resections, acute ischemic stroke thrombolysis, epilepsy, and Parkinson's management.",
    conditions: [
      "Acute Ischemic Stroke",
      "Epilepsy & Seizures",
      "Parkinson's & Tremors",
      "Migraines & Neuropathy",
    ],
    procedures: ["Digital Video EEG", "Brain MRI & CT Angio", "Spine Microdiscectomy", "Neuro-rehabilitation"],
    doctorsCount: "6 Specialists",
    openHours: "Mon - Sat (8:30 AM - 6:00 PM)",
  },
  {
    id: "pediatrics",
    name: "Pediatrics & Neonatal Care",
    shortName: "Pediatrician",
    category: "Pediatrics & Women",
    badge: "Level III NICU",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    desc: "Holistic healthcare for newborns, infants, children, and teenagers, covering developmental screening, pediatric critical care, and routine immunization.",
    conditions: [
      "Childhood Asthma & Allergies",
      "Growth & Nutritional Deficits",
      "Congenital Disorders",
      "Pediatric Infections",
    ],
    procedures: ["Neonatal Intensive Care", "Child Immunization Schedule", "Developmental Milestones", "Pediatric Emergency"],
    doctorsCount: "7 Specialists",
    openHours: "24/7 Pediatric Emergency",
  },
  {
    id: "orthopedics",
    name: "Orthopedics & Joint Replacement",
    shortName: "Orthopedic",
    category: "Surgical Specialties",
    badge: "Robotic Surgery",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    desc: "Sub-specialized orthopedic care including computer-navigated robotic knee/hip replacement, sports medicine, spinal alignment, and trauma fixation.",
    conditions: [
      "Osteoarthritis & Cartilage Wear",
      "ACL & Meniscal Tears",
      "Complex Bone Fractures",
      "Lumbar Disc Herniation",
    ],
    procedures: ["Robotic Knee Replacement", "Arthroscopic Shoulder Repair", "Spine Decompression", "Post-op Physiotherapy"],
    doctorsCount: "9 Specialists",
    openHours: "Mon - Sat (8:00 AM - 7:00 PM)",
  },
  {
    id: "dermatology",
    name: "Dermatology & Skin Science",
    shortName: "Dermatologist",
    category: "Primary & Family",
    badge: "Laser Center",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
    iconBg: "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
    desc: "Medical, pediatric, and aesthetic dermatology diagnosing complex chronic dermatoses, autoimmune bullous diseases, skin malignancies, and scar therapies.",
    conditions: [
      "Eczema & Psoriasis",
      "Acne Vulgaris & Rosacea",
      "Hair Loss & Alopecia",
      "Pigmentation & Melasma",
    ],
    procedures: ["Skin Biopsy & Dermoscopy", "Cryotherapy & Laser Excision", "Allergy Patch Testing", "Cosmetic Skin Peels"],
    doctorsCount: "5 Specialists",
    openHours: "Mon - Sat (9:00 AM - 5:30 PM)",
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology & Hepatology",
    shortName: "Gastroenterologist",
    category: "Internal Medicine",
    badge: "Advanced Endoscopy",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    desc: "Diagnostic and therapeutic digestive interventions covering liver cirrhosis, inflammatory bowel disease (IBD), acid reflux, and biliary tract diseases.",
    conditions: [
      "Liver Cirrhosis & Hepatitis",
      "Crohn's Disease & Colitis",
      "GERD & Peptic Ulcers",
      "Gallstones & Pancreatitis",
    ],
    procedures: ["Upper GI Endoscopy", "Diagnostic Colonoscopy", "ERCP Biliary Stenting", "FibroScan Liver Scoring"],
    doctorsCount: "6 Specialists",
    openHours: "Mon - Sat (8:00 AM - 6:00 PM)",
  },
  {
    id: "oncology",
    name: "Medical & Surgical Oncology",
    shortName: "Oncologist",
    category: "Surgical Specialties",
    badge: "Daycare Chemotherapy",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    iconBg: "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
    desc: "Multidisciplinary tumor boards delivering precision targeted immunotherapy, minimally invasive tumor resection, and palliative care.",
    conditions: [
      "Solid Organ Malignancies",
      "Hematologic Cancers",
      "Gastrointestinal Tumors",
      "Breast & Gynecologic Oncology",
    ],
    procedures: ["Chemotherapy Infusion", "Targeted Immunotherapy", "Surgical Tumor Resection", "Genetic Cancer Profiling"],
    doctorsCount: "5 Specialists",
    openHours: "Mon - Fri (8:00 AM - 5:00 PM)",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology & Eye Care",
    shortName: "Ophthalmologist",
    category: "Primary & Family",
    badge: "Femto-Laser Surgery",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    iconBg: "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
    desc: "Advanced ocular diagnostic workups, micro-incision cataract extractions (MICS), laser refractive corrections, glaucoma management, and retina care.",
    conditions: [
      "Cataracts & Refractive Errors",
      "Diabetic Retinopathy",
      "Glaucoma & Eye Pressure",
      "Corneal Disorders",
    ],
    procedures: ["Phaco Cataract Surgery", "Retinal Angiography & Laser", "Optical Coherence Tomography (OCT)", "Corneal Topography"],
    doctorsCount: "4 Specialists",
    openHours: "Mon - Sat (9:00 AM - 6:00 PM)",
  },
  {
    id: "immunology",
    name: "Immunology & Rheumatology",
    shortName: "Immunologist",
    category: "Internal Medicine",
    badge: "Autoimmune Center",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconBg: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    desc: "Specialized care for systemic lupus erythematosus, rheumatoid arthritis, vasculitis, allergic asthma, and primary immunodeficiency disorders.",
    conditions: [
      "Rheumatoid & Psoriatic Arthritis",
      "Systemic Lupus (SLE)",
      "Ankylosing Spondylitis",
      "Severe Allergic Disorders",
    ],
    procedures: ["Biologic Infusion Therapy", "Joint Aspiration & Injections", "Immunological Serology", "Pulmonary Function Tests"],
    doctorsCount: "4 Specialists",
    openHours: "Mon - Fri (9:00 AM - 5:00 PM)",
  },
  {
    id: "pathology",
    name: "Pathology & Digital Diagnostics",
    shortName: "Pathologist",
    category: "Diagnostics & Emergency",
    badge: "NABL Accredited",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    iconBg: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
    desc: "Fully automated molecular diagnostics, histopathology, cytopathology, biochemistry, and microbiology ensuring high-precision diagnostic turnarounds.",
    conditions: [
      "Comprehensive Blood Chemistry",
      "Infectious Disease Serology",
      "Histopathology & Biopsies",
      "Hormonal & Thyroid Panels",
    ],
    procedures: ["Automated Complete Blood Count", "Real-Time RT-PCR", "Immunohistochemistry", "Same-Day Digital Health Reports"],
    doctorsCount: "6 Pathologists",
    openHours: "24/7 Diagnostics Lab",
  },
  {
    id: "gynecology",
    name: "Obstetrics & Women's Health",
    shortName: "Gynecologist",
    category: "Pediatrics & Women",
    badge: "Modern Birthing Suites",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    iconBg: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
    desc: "Holistic maternity care, high-risk obstetric monitoring, painless delivery options, minimally invasive laparoscopic gynecological surgeries, and fertility support.",
    conditions: [
      "High-Risk Pregnancy",
      "Polycystic Ovary Syndrome (PCOS)",
      "Endometriosis & Fibroids",
      "Menopause Management",
    ],
    procedures: ["Fetal Ultrasound & Screening", "Laparoscopic Hysterectomy", "Painless Normal Delivery", "Pap Smears & Well-Woman Checks"],
    doctorsCount: "7 Specialists",
    openHours: "24/7 Labor Room & Maternity",
  },
  {
    id: "emergency",
    name: "Emergency & Critical Care Trauma",
    shortName: "Emergency Physician",
    category: "Diagnostics & Emergency",
    badge: "Level 1 Trauma Triage",
    badgeColor: "bg-red-100 text-red-800 border-red-300 font-bold",
    iconBg: "bg-red-50 text-red-700 group-hover:bg-red-700 group-hover:text-white",
    desc: "Round-the-clock emergency medical faculty trained in ALS/ATLS protocols, resuscitation bays, dedicated mobile ambulances, and multi-specialty trauma units.",
    conditions: [
      "Acute Cardiac & Respiratory Arrest",
      "Severe Poly-trauma & Accidents",
      "Acute Chemical Toxicities & Burns",
      "Septic & Hypovolemic Shock",
    ],
    procedures: ["Advanced Airway Management", "Central Venous Access", "Emergency Thoracostomy", "Bedside Focused Ultrasound (FAST)"],
    doctorsCount: "12 Emergency Doctors",
    openHours: "Open 24/7 / 365 Days",
  },
];

const CATEGORIES = [
  "All Departments",
  "Cardiovascular",
  "Neuro & Spine",
  "Surgical Specialties",
  "Pediatrics & Women",
  "Internal Medicine",
  "Primary & Family",
  "Diagnostics & Emergency",
];

function Specialties() {
  const [selectedCategory, setSelectedCategory] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecialties = SPECIALTIES_DATA.filter((dept) => {
    const matchesCategory =
      selectedCategory === "All Departments" || dept.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      dept.name.toLowerCase().includes(query) ||
      dept.shortName.toLowerCase().includes(query) ||
      dept.desc.toLowerCase().includes(query) ||
      dept.conditions.some((c) => c.toLowerCase().includes(query)) ||
      dept.procedures.some((p) => p.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Header / Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-950 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Specialties & Clinical Departments</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-700/60 border border-blue-500/40 text-blue-200 text-xs sm:text-sm font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                25+ Accredited Clinical Specialties
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Specialized Medical Care, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-teal-200 to-white">
                  Engineered For Complete Healing
                </span>
              </h1>

              <p className="text-blue-100 text-base sm:text-lg max-w-2xl leading-relaxed">
                From emergency cardiac catheterization and robotic orthopedics to advanced neonatal care,
                CarePulse combines modern medical infrastructure with internationally certified physicians.
              </p>
            </div>

            {/* Quick Stats banner */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-200">
                Department Highlights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl font-extrabold text-white block">12+</span>
                  <span className="text-xs text-blue-200">Centers of Excellence</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl font-extrabold text-teal-300 block">50+</span>
                  <span className="text-xs text-blue-200">Senior Consultants</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl font-extrabold text-emerald-300 block">24/7</span>
                  <span className="text-xs text-blue-200">Emergency & ICU</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-2xl font-extrabold text-amber-300 block">99.2%</span>
                  <span className="text-xs text-blue-200">Clinical Efficacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search & Category Filters Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-4 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
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
                placeholder="Search specialty, illness, or procedure..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50 hover:bg-white transition-all text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <div className="text-xs sm:text-sm font-medium text-slate-500 self-start md:self-center">
              Showing <strong className="text-slate-900">{filteredSpecialties.length}</strong> clinical specialties
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Specialties Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {filteredSpecialties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900">No specialties match your search</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              We couldn't find any department matching "{searchQuery}". Try searching for another medical term or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Departments");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredSpecialties.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group overflow-hidden"
              >
                <div className="p-6 sm:p-7 space-y-5">
                  {/* Top Bar: Icon and Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-13 h-13 rounded-2xl p-3 flex items-center justify-center font-bold text-xl shadow-sm transition-all ${dept.iconBg}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${dept.badgeColor}`}
                    >
                      {dept.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                      {dept.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                      {dept.desc}
                    </p>
                  </div>

                  {/* Common Conditions Treated */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Common Conditions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.conditions.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Available Procedures */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Diagnostic & Procedures:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.procedures.map((p, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability info */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {dept.openHours}
                    </span>
                    <span className="font-semibold text-slate-700">{dept.doctorsCount}</span>
                  </div>
                </div>

                {/* Bottom Actions Footer */}
                <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <Link
                    to={`/find-doctor?specialty=${encodeURIComponent(dept.shortName)}`}
                    className="inline-flex items-center justify-center gap-1 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all text-center"
                  >
                    <span>View Doctors</span>
                    <span>→</span>
                  </Link>

                  <Link
                    to="/patient/book-appointment"
                    className="inline-flex items-center justify-center text-xs font-semibold px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 transition-all text-center"
                  >
                    Book OPD
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Clinical Technology & Quality Standards */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Hospital Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Patients Trust Our Clinical Centers
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Our departments adhere to international clinical protocols with real-time multi-disciplinary coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
                🔬
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Cutting-Edge Diagnostics
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tesla 3T MRI, 128-slice dual source CT, high-definition endoscopes, and automated molecular diagnostic platforms ensure accurate findings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-lg mb-4">
                🩺
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Board-Certified Faculty
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consultants trained at renowned medical institutions with decades of experience handling both standard cases and critical medical emergencies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg mb-4">
                🛡️
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Zero-Infection Protocol
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                HEPA-filtered laminar airflow operating theaters and dedicated critical care infection surveillance adhering to CDC guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Patient Assistance & Booking Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200">
              Need Help Choosing a Specialty?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Our Medical Coordinators Are Here to Guide You
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Not sure which specialist or department is right for your symptoms? Call our 24/7 patient helpline or search our verified doctor directory.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/find-doctor"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-colors text-center text-sm"
            >
              Browse Doctor Directory
            </Link>
            <a
              href="tel:18005550199"
              className="bg-blue-800/80 hover:bg-blue-800 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-colors text-center text-sm"
            >
              Call Helpline
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Specialties;
