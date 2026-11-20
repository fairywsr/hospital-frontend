import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

/**
 * ProtectedRoute Component
 * Guards routes based on authentication status and allowed user roles.
 *
 * @param {Array<string>} allowedRoles - Array of roles permitted to access (e.g. ['Patient', 'Doctor', 'Admin'])
 */
export function ProtectedRoute({ allowedRoles = [] }) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  // 1. Not authenticated -> Redirect to dedicated login page based on target path or role
  if (!user) {
    let targetLogin = "/patient/login";
    if (location.pathname.startsWith("/admin") || allowedRoles.includes("Admin")) {
      targetLogin = "/admin/login";
    } else if (location.pathname.startsWith("/doctor") || allowedRoles.includes("Doctor")) {
      targetLogin = "/doctor/login";
    } else if (location.pathname.startsWith("/patient") || allowedRoles.includes("Patient")) {
      targetLogin = "/patient/login";
    }

    return <Navigate to={targetLogin} state={{ from: location }} replace />;
  }

  // 2. Role not authorized -> Redirect to unauthorized page
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Authorized -> Render child routes
  return <Outlet />;
}

export default ProtectedRoute;
