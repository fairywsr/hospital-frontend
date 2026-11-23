import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import Unauthorized from "../../pages/Unauthorized";

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
    const path = location.pathname.toLowerCase();
    const normalizedRoles = allowedRoles.map((r) => r.toLowerCase());

    if (path.startsWith("/admin") || normalizedRoles.includes("admin")) {
      targetLogin = "/admin/login";
    } else if (path.startsWith("/doctor") || normalizedRoles.includes("doctor")) {
      targetLogin = "/doctor/login";
    } else if (path.startsWith("/patient") || normalizedRoles.includes("patient")) {
      targetLogin = "/patient/login";
    }

    return <Navigate to={targetLogin} state={{ from: location }} replace />;
  }

  // 2. Role not authorized -> Render Unauthorized component
  const userRole = (user.role || "").toLowerCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());
  if (normalizedAllowed.length > 0 && !normalizedAllowed.includes(userRole)) {
    return <Unauthorized />;
  }

  // 3. Authorized -> Render child routes
  return <Outlet />;
}

export default ProtectedRoute;
