import React from "react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Emergency Callout Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">
                Medical Emergency & Ambulance Hotline
              </h4>
              <p className="text-sm text-slate-400">
                24/7 Immediate medical response and patient transport
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:911"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-red-900/30"
            >
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              Emergency: +1 (800) 555-0199
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Hospital Overview */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
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
              <span className="text-xl font-bold text-white tracking-tight">
                Care<span className="text-blue-500">Pulse</span> Hospital
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
              Providing compassionate, accredited medical excellence with advanced
              diagnostic technologies and specialized clinical departments.
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <span className="text-blue-400 font-semibold">Address:</span>
                123 Healthcare Blvd, Medical District, NY 10001
              </p>
              <p className="flex items-center gap-2">
                <span className="text-blue-400 font-semibold">Email:</span>
                contact@carepulsehospital.org
              </p>
            </div>
          </div>

          {/* Column 2: Departments */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Departments
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Cardiology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Neurology & Brain
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pediatrics & Neonatal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Orthopedics & Spine
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Oncology & Chemotherapy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Emergency & Trauma Care
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Care */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Patient Care
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Book an Appointment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Find a Doctor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Patient Health Portal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Lab & Diagnostic Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Insurance & Billing Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Patient Rights & Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hospital Hours */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Hospital Hours
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div>
                <p className="text-white font-medium">Emergency Services:</p>
                <p className="text-emerald-400 font-semibold">Open 24/7 / 365 Days</p>
              </div>
              <div>
                <p className="text-white font-medium">Outpatient Clinic (OPD):</p>
                <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
                <p>Sunday: 9:00 AM - 2:00 PM</p>
              </div>
              <div>
                <p className="text-white font-medium">Visiting Hours:</p>
                <p>4:00 PM - 7:00 PM Daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal */}
      <div className="border-t border-slate-800 bg-slate-950/80 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 CarePulse Hospital Management System. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              HIPAA Compliance
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
