import { Link } from "react-router-dom";

function ForgotPassword() {
  const portals = [
    {
      role: "Patient",
      title: "Patient Account Recovery",
      description: "Reset password for patients to access medical records and appointments.",
      path: "/patient/forgot-password",
      loginPath: "/patient/login",
      color: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
    {
      role: "Doctor",
      title: "Doctor / Physician Recovery",
      description: "Reset password for healthcare providers and medical staff.",
      path: "/doctor/forgot-password",
      loginPath: "/doctor/login",
      color: "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200",
      badge: "bg-teal-50 text-teal-700 border-teal-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
    },
    {
      role: "Admin",
      title: "Administrator Recovery",
      description: "Reset password for system administrators with portal credentials.",
      path: "/admin/forgot-password",
      loginPath: "/admin/login",
      color: "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200",
      badge: "bg-purple-50 text-purple-700 border-purple-200",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-xl mx-auto flex items-center justify-center shadow-md shadow-blue-200 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"
              />
            </svg>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
            Account Recovery
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
            Select your account type below to receive a secure password reset link.
          </p>
        </div>

        {/* Portal Options */}
        <div className="space-y-4">
          {portals.map((portal) => (
            <div
              key={portal.role}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${portal.badge}`}>
                    {portal.role}
                  </span>
                  <h2 className="text-base font-bold text-slate-800">{portal.title}</h2>
                </div>
                <p className="text-xs text-slate-500">{portal.description}</p>
                <div className="pt-1">
                  <Link
                    to={portal.loginPath}
                    className="text-xs text-slate-500 hover:text-slate-800 hover:underline"
                  >
                    Remember password? Sign in →
                  </Link>
                </div>
              </div>

              <Link
                to={portal.path}
                className={`py-2.5 px-5 rounded-xl text-xs font-semibold text-center shrink-0 shadow-md transition-all flex items-center justify-center gap-2 ${portal.color}`}
              >
                {portal.icon}
                <span>Reset {portal.role} Password</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Need immediate assistance? Call our 24/7 Helpline:{" "}
          <strong className="text-slate-700">+1 (800) 555-0199</strong>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
