import React from "react";

function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Top hospital emergency banner */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 Emergency Care
            </span>
            <span className="hidden sm:inline text-blue-300">|</span>
            <span className="hidden sm:inline">
              Helpline: <strong className="text-white">+1 (800) 555-0199</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-blue-200">
            <span>OPD: Mon - Sat (8:00 AM - 8:00 PM)</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Hospital Brand & Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              {/* Medical Cross Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
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
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Care<span className="text-blue-600">Pulse</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest block -mt-1">
                Hospital & Clinic
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Find Doctors
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Departments
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Appointments
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex text-sm font-medium text-slate-700 hover:text-blue-600 border border-slate-300 hover:border-blue-400 px-4 py-2 rounded-lg transition-colors">
              Patient Portal
            </button>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg shadow-sm shadow-blue-200 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
