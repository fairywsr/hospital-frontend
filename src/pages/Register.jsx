import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-xl mx-auto flex items-center justify-center shadow-md shadow-blue-200 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
            Patient Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Patient Registration</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
            Create your health account to schedule appointments, manage vitals, and view reports.
          </p>
        </div>

        {/* Patient Register Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="space-y-4">
            <Link
              to="/patient/register"
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-center block bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 transition-all"
            >
              Register as Patient
            </Link>
            <div className="text-center">
              <span className="text-xs text-slate-500">Already registered? </span>
              <Link to="/patient/login" className="text-xs font-semibold text-blue-600 hover:underline">
                Patient Sign In →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Need assistance? Call our 24/7 Helpline:{" "}
          <strong className="text-slate-700">+1 (800) 555-0199</strong>
        </div>
      </div>
    </div>
  );
}

export default Register;
