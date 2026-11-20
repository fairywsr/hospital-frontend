import { Link } from "react-router-dom";

function Register() {
  const portals = [
    {
      role: "Patient",
      title: "Patient Registration",
      subtitle: "Create a health account to schedule appointments, manage vitals, and view reports",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-blue-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      badge: "Open Enrollment",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200",
      registerPath: "/patient/register",
      loginPath: "/patient/login",
      loginLabel: "Already registered? Patient Sign In",
    },
    {
      role: "Doctor",
      title: "Doctor Credentialing",
      subtitle: "Apply as a clinical physician or specialist. Includes credentialing & admin verification",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-teal-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
      badge: "Clinical Verification",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
      buttonColor: "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200",
      registerPath: "/doctor/register",
      loginPath: "/doctor/login",
      loginLabel: "Already approved? Doctor Sign In",
    },
    {
      role: "Admin",
      title: "Admin Registration",
      subtitle: "Register administrative personnel. Requires authorized Hospital Secret Passkey",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-purple-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
      badge: "Secret Passkey Needed",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200",
      registerPath: "/admin/register",
      loginPath: "/admin/login",
      loginLabel: "Staff access? Admin Sign In",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-xl mx-auto flex items-center justify-center shadow-md shadow-blue-200 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Join the CarePulse Network</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Choose your account type to proceed to the dedicated registration portal.
          </p>
        </div>

        {/* 3 Portal Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <div
              key={portal.role}
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {portal.icon}
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${portal.badgeColor}`}>
                    {portal.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2">{portal.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{portal.subtitle}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <Link
                  to={portal.registerPath}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center block shadow-md transition-all ${portal.buttonColor}`}
                >
                  Register as {portal.role}
                </Link>

                <div className="text-center">
                  <Link
                    to={portal.loginPath}
                    className="text-xs text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{portal.loginLabel}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Go to Portal Login Directory
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
