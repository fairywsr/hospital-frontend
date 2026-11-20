import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

// Dedicated Role-Specific Login & Registration Pages
import PatientLogin from "./pages/patient/PatientLogin";
import PatientRegister from "./pages/patient/PatientRegister";
import DoctorLogin from "./pages/doctor/DoctorLogin";
import DoctorRegister from "./pages/doctor/DoctorRegister";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";

// Routing Guards
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PublicRoute from "./components/routing/PublicRoute";

// Role-Specific Layouts
import PatientLayout from "./components/layouts/PatientLayout";
import DoctorLayout from "./components/layouts/DoctorLayout";
import AdminLayout from "./components/layouts/AdminLayout";

// Role-Specific Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* 1. Public Marketing & Authentication Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Public-only routes: redirect logged-in users to their respective portal */}
        <Route element={<PublicRoute />}>
          {/* Main Portal Directory Hubs */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dedicated Separate Patient Auth Views */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/login/patient" element={<Navigate to="/patient/login" replace />} />
          <Route path="/register/patient" element={<Navigate to="/patient/register" replace />} />

          {/* Dedicated Separate Doctor Auth Views */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="/login/doctor" element={<Navigate to="/doctor/login" replace />} />
          <Route path="/register/doctor" element={<Navigate to="/doctor/register" replace />} />

          {/* Dedicated Separate Admin Auth Views */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/login/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/register/admin" element={<Navigate to="/admin/register" replace />} />
        </Route>
      </Route>

      {/* 2. Patient Views (Protected: Role = Patient) */}
      <Route element={<ProtectedRoute allowedRoles={["Patient"]} />}>
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="book-appointment" element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientDashboard />} />
          <Route path="profile" element={<PatientDashboard />} />
        </Route>
      </Route>

      {/* 3. Doctor Views (Protected: Role = Doctor) */}
      <Route element={<ProtectedRoute allowedRoles={["Doctor"]} />}>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorDashboard />} />
          <Route path="patients" element={<DoctorDashboard />} />
          <Route path="schedule" element={<DoctorDashboard />} />
          <Route path="profile" element={<DoctorDashboard />} />
        </Route>
      </Route>

      {/* 4. Admin Views (Protected: Role = Admin) */}
      <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pending-doctors" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDashboard />} />
          <Route path="patients" element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* 5. Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
