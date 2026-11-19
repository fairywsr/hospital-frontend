import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Unauthorized() {
  const user = useAuthStore((state) => state.user);

  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "Admin") return "/admin/dashboard";
    if (user.role === "Doctor") return "/doctor/dashboard";
    return "/patient/dashboard";
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-lg">
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Access Denied (403)</h1>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          You do not have the required role permissions to view this section.
          {user ? ` You are currently signed in as a ${user.role}.` : ""}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={getDashboardPath()}
            className="inline-flex justify-center items-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
          >
            Return to My Dashboard
          </Link>
          <Link
            to="/"
            className="inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
