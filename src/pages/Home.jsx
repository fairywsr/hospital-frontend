import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";

function Home() {
  // Clinical specialties data for rendering cards
  const specialties = [
    {
      name: "Cardiology",
      desc: "Comprehensive heart care, advanced catheterization, and post-cardiac rehabilitation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ),
      badge: "24/7 Cath Lab",
    },
    {
      name: "Neurology & Brain",
      desc: "Specialized care for neurovascular conditions, spine disorders, and stroke management.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
        </svg>
      ),
      badge: "Stroke Unit",
    },
    {
      name: "Pediatrics & Child Care",
      desc: "Gentle healthcare for infants, toddlers, and adolescents including routine vaccinations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
      ),
      badge: "NICU Available",
    },
    {
      name: "Orthopedics & Spine",
      desc: "Joint replacement, fracture reconstruction, sports medicine, and physical rehabilitation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      badge: "Robotic Surgery",
    },
    {
      name: "Pathology & Diagnostics",
      desc: "High-precision automated pathology, molecular labs, and same-day digital health reports.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.942A4.5 4.5 0 0 1 15.9 16.5H8.1a4.5 4.5 0 0 1-2.33-.658L4.2 14.9" />
        </svg>
      ),
      badge: "NABL Accredited",
    },
    {
      name: "Ophthalmology",
      desc: "Complete vision diagnostics, cataract procedures, refractive surgery, and retinal care.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
      badge: "Laser Treatment",
    },
  ];

  // Doctors preview list
  const doctors = [
    {
      name: "Dr. Sarah Mitchell",
      specialty: "Senior Cardiologist",
      experience: "15+ Years Exp",
      rating: "4.9",
      available: "Today",
      avatarBg: "bg-blue-600",
      initials: "SM",
    },
    {
      name: "Dr. David Chen",
      specialty: "Neurologist & Brain Specialist",
      experience: "12+ Years Exp",
      rating: "4.8",
      available: "Tomorrow",
      avatarBg: "bg-teal-600",
      initials: "DC",
    },
    {
      name: "Dr. Priya Patel",
      specialty: "Pediatric Consultant",
      experience: "10+ Years Exp",
      rating: "5.0",
      available: "Today",
      avatarBg: "bg-emerald-600",
      initials: "PP",
    },
    {
      name: "Dr. Arthur Vance",
      specialty: "Orthopedic Surgeon",
      experience: "18+ Years Exp",
      rating: "4.9",
      available: "Thursday",
      avatarBg: "bg-indigo-600",
      initials: "AV",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Key Pillars / Hospital Features Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Emergency 24/7</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Equipped with modern trauma care, critical ICUs, and on-call surgeons.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Expert Doctors</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Consult with accredited medical specialists across 25+ clinical fields.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Instant Booking</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Reserve your OPD or consultation slot without waiting in hospital queues.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Digital Reports</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Access your prescriptions, lab tests, and doctor notes securely anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Medical Specialties / Departments */}
      <section id="specialties" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Clinical Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Our Medical Departments
            </h2>
            <p className="text-slate-600 text-base mt-2">
              State-of-the-art facilities backed by multi-disciplinary medical teams committed to quality patient outcomes.
            </p>
          </div>
          <Link
            to="/specialties"
            className="mt-4 sm:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 shrink-0"
          >
            <span>Explore All Specialties</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {specialties.map((dept, index) => (
            <Link
              to={`/find-doctor?specialty=${encodeURIComponent(dept.name.split(" ")[0])}`}
              key={index}
              className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                  {dept.icon}
                </div>
                <span className="text-xs font-medium text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-full">
                  {dept.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {dept.name}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {dept.desc}
              </p>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                <span>View Department Specialists</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us / Hospital Highlights */}
      <section className="bg-white py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Why CarePulse
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Compassionate Care Combined With Modern Clinical Precision
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Our hospital is committed to delivering accessible, transparent, and patient-first healthcare. From quick appointment scheduling to cashless hospitalization, your well-being comes first.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">NABH & ISO Certified Standards</h4>
                    <p className="text-xs sm:text-sm text-slate-500">Rigorous infection control protocols and clinical quality monitoring.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Cashless Mediclaim Support</h4>
                    <p className="text-xs sm:text-sm text-slate-500">Hassle-free coverage with 40+ leading insurance and TPA partners.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Integrated Patient Portal</h4>
                    <p className="text-xs sm:text-sm text-slate-500">Instant access to digital prescriptions, diagnostic tests, and past visits.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card Feature */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
                    Patient Satisfaction Record
                  </div>
                  <h3 className="text-3xl font-extrabold leading-snug">
                    Over 98% of patients recommend our medical team.
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    "From the moment we arrived at emergency triage to the doctor consultation, everything was handled with compassion, speed, and utmost professionalism."
                  </p>

                  <div className="pt-4 border-t border-blue-500/40 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">Elena Rostova</p>
                      <p className="text-xs text-blue-200">Patient • Cardiology Dept</p>
                    </div>
                    <div className="flex text-amber-300 text-sm">
                      ★★★★★
                    </div>
                  </div>
                </div>

                {/* Subtle background glow */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Specialists / Top Doctors */}
      <section id="doctors" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Medical Faculty
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Featured Specialists
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Book consultations with our leading physicians and department heads.
            </p>
          </div>
          <Link
            to="/find-doctor"
            className="mt-4 sm:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>Browse All Doctors</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Doctor Avatar / Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${doc.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-md`}
                  >
                    {doc.initials}
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    {doc.available}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{doc.name}</h3>
                <p className="text-xs text-blue-600 font-medium mt-0.5">{doc.specialty}</p>
                <p className="text-xs text-slate-400 mt-1">{doc.experience}</p>

                <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-600">
                  <span className="text-amber-500 font-bold">★ {doc.rating}</span>
                  <span className="text-slate-400">• Highly Recommended</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  to="/patient/book-appointment"
                  className="w-full block text-center py-2 px-3 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Call to Action / Booking Appointment Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200">
              Fast-Track Health Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to schedule your appointment?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Skip hospital queues. Choose your specialist, pick a convenient time slot, and get your consultation confirmed instantly.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-4">
              <Link
                to="/patient/book-appointment"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-colors text-center inline-block"
              >
                Book An Appointment
              </Link>
              <button className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors">
                Contact Hospital Desk
              </button>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}

export default Home;
