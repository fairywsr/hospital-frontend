import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

/**
 * PublicRoute Component
 * Prevents logged-in users from accessing public authentication pages (Login, Register).
 * Automatically redirects them to their designated role dashboard.
 */
export function PublicRoute() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    if (user.role === "Admin") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "Doctor") return <Navigate to="/doctor/dashboard" replace />;
    return <Navigate to="/patient/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
