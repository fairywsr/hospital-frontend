import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import Unauthorized from "../../pages/Unauthorized";

/**
 * PublicRoute Component
 * Guards authentication / public views:
 * - If targetRole is specified (e.g. 'Patient', 'Doctor', 'Admin'):
 *   - Not authenticated: can access (renders Outlet)
 *   - Authenticated with SAME role: redirects to that role's dashboard
 *   - Authenticated with DIFFERENT role (e.g. Doctor trying to access Patient/Admin login):
 *     Renders <Unauthorized /> component!
 * - If targetRole is omitted:
 *   - If authenticated: redirects to role dashboard
 *   - Not authenticated: renders Outlet
 */
export function PublicRoute({ targetRole }) {
  const user = useAuthStore((state) => state.user);

  if (user) {
    const userRole = (user.role || "").toLowerCase();
    const target = (targetRole || "").toLowerCase();

    // Trying to access another role's auth/portal page while already authenticated
    if (target && userRole !== target) {
      return <Unauthorized />;
    }

    // Already signed in with the correct role -> navigate to their dashboard
    if (userRole === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (userRole === "doctor") return <Navigate to="/doctor/dashboard" replace />;
    return <Navigate to="/patient/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
