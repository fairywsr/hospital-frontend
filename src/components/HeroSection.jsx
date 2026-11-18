import React from "react";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 sm:py-16 lg:py-16">
      {/* Decorative background blur blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-200/40 to-teal-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>NABH & JCI Accredited • 24/7 Multi-Specialty Care</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Expert Healthcare, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                Delivered With Care.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Book appointments with world-class specialists, access digital
              medical records, and experience seamless hospital services
              designed around your recovery and well-being.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5">
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                Book Appointment
              </button>

              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 shadow-sm transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                Find Doctors
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                  50+
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  Expert Doctors
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-600">
                  10k+
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  Happy Patients
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                  24/7
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  Emergency Care
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-600">
                  99.8%
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  Recovery Rate
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Medical Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/70 border border-slate-100">
                {/* Header of Preview Card */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
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
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Dr. Sarah Mitchell
                      </h3>
                      <p className="text-xs text-slate-500">
                        Chief of Cardiology
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                    Available Today
                  </span>
                </div>

                {/* Appointment Schedule Widget Preview */}
                <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      Next Slot:
                    </span>
                    <span className="font-semibold text-blue-600">
                      Today, 2:30 PM
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button className="py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white shadow-sm">
                      02:30 PM
                    </button>
                    <button className="py-2 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-400">
                      03:15 PM
                    </button>
                    <button className="py-2 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-400">
                      04:00 PM
                    </button>
                  </div>
                </div>

                {/* Patient Vitals & Health Indicator preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      OPD Consultation Queue
                    </span>
                    <span className="text-slate-900 font-bold">12 Waiting</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                {/* 24/7 Emergency Quick Strip */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="font-semibold text-slate-700">
                      Emergency Casualty
                    </span>
                  </div>
                  <span className="text-red-600 font-bold">Immediate Care</span>
                </div>
              </div>

              {/* Floating Testimonial Pill */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
                  ★ 4.9
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Highest Rated Care
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Over 3,500+ Verified Patient Reviews
                  </p>
                </div>
              </div>

              {/* Floating Bed Availability Pill */}
              <div className="hidden sm:flex absolute -top-5 -right-5 bg-white rounded-2xl p-3 shadow-lg border border-slate-100 items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div className="text-xs font-semibold text-slate-800">
                  ICU & General Beds Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
