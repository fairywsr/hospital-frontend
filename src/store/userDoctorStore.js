import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const useDoctorStore = create((set) => ({
  doctor: null,
  allDoctors: [],
  pendingDoctors: [],
  loading: false,
  error: null,

  // ── Register ─────────────────────────────────────────────────────────────────
  // POST /doctor/register-doctor
  // Body: { name, email, password, phone, specilization, license, age, experience, gender }
  // Controller returns { success, message, doctor }
  registerDoctor: async (doctorData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post(
        "doctor/register-doctor",
        doctorData,
      );

      set({ loading: false, doctor: data.doctor });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Registration failed",
        loading: false,
      });
      throw error;
    }
  },

  // ── Login ────────────────────────────────────────────────────────────────────
  // POST /doctor/login
  // Body: { email, password }
  // Controller calls sendToken → returns { success, message, doctor, token }
  loginDoctor: async (doctorData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post("doctor/login", doctorData);

      const doctorUser = data.doctor || data.user;
      set({ loading: false, doctor: doctorUser });

      useAuthStore.getState().setUser({
        ...doctorUser,
        role: "Doctor",
      });

      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Login failed",
        loading: false,
      });
      throw error;
    }
  },

  // ── Logout ───────────────────────────────────────────────────────────────────
  // POST /doctor/logout  (clears the httpOnly cookie server-side)
  // Controller returns { success, message }
  logoutDoctor: async () => {
    try {
      set({ loading: true, error: null });

      await axiosInstance.post("doctor/logout");

      set({ doctor: null, allDoctors: [], pendingDoctors: [], loading: false });
      useAuthStore.getState().clearUser();
    } catch (error) {
      // Clear client-side state even if the server call fails
      set({
        doctor: null,
        allDoctors: [],
        pendingDoctors: [],
        loading: false,
        error: error?.response?.data?.message || "Logout failed",
      });
      useAuthStore.getState().clearUser();
    }
  },

  // ── Doctor Profile ───────────────────────────────────────────────────────────
  // GET /doctor/profile/:id
  // Controller returns { success, message, Doctor }  (capital D key)
  doctorProfile: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.get(`doctor/profile/${id}`);

      // Controller returns key "Doctor" (capital D)
      const doctorUser = data.Doctor || data.doctor;
      set({ loading: false, doctor: doctorUser });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch profile",
        loading: false,
      });
      throw error;
    }
  },

  // ── Edit Profile ─────────────────────────────────────────────────────────────
  // PUT /doctor/update-profile/:id
  // Body: any updatable doctor fields
  // Controller returns { success, message, doctor }
  editProfile: async (id, doctorData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `doctor/update-profile/${id}`,
        doctorData,
      );

      set({ loading: false, doctor: data.doctor || data.user });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to update profile",
        loading: false,
      });
      throw error;
    }
  },

  // ── Delete Profile ───────────────────────────────────────────────────────────
  // DELETE /doctor/delete-profile/:id
  // Controller returns { success, message }
  deleteProfile: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.delete(
        `doctor/delete-profile/${id}`,
      );

      set({ loading: false, doctor: null });
      useAuthStore.getState().clearUser();
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to delete profile",
        loading: false,
      });
      throw error;
    }
  },

  // ── Reset Password Request ────────────────────────────────────────────────────
  // PUT /doctor/reset-password-request
  // Body: { email }
  // Controller sends a reset-link email; returns { success, message }
  resetPasswordRequest: async (userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        "doctor/reset-password-request",
        userData,
      );

      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message || "Password reset request failed",
        loading: false,
      });
      throw error;
    }
  },

  // ── Reset Password (via token) ────────────────────────────────────────────────
  // PUT /doctor/reset-password/:token
  // Body: { password, confirmPassword }
  // Controller returns { success, message }
  resetPassword: async (token, userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `doctor/reset-password/${token}`,
        userData,
      );

      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Password reset failed",
        loading: false,
      });
      throw error;
    }
  },

  // ── Update Password (while logged in) ────────────────────────────────────────
  // PUT /doctor/update-password
  // Body: { oldPassword, newPassword, confirmPassword }
  // Controller reads req.user.id from auth middleware
  // Returns sendToken → { success, message, doctor, token }
  updatePassword: async (userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        "doctor/update-password",
        userData,
      );

      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to update password",
        loading: false,
      });
      throw error;
    }
  },

  // ── Get All Doctors (Admin) ───────────────────────────────────────────────────
  // GET /doctor/all-doctors
  // Controller returns { success, message, doctors }
  getAllDoctors: async () => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.get("doctor/all-doctors");

      set({ loading: false, allDoctors: data.doctors || [] });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch doctors",
        loading: false,
      });
      throw error;
    }
  },

  // ── Approve Doctor (Admin) ────────────────────────────────────────────────────
  // PUT /doctor/approve-doctor/:id
  // Controller sets status → "Approved"; returns { success, message, doctor }
  approveDoctor: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(`doctor/approve-doctor/${id}`);

      // Update the matching doctor inside allDoctors list
      set((state) => ({
        loading: false,
        allDoctors: state.allDoctors.map((d) =>
          d._id === id ? { ...d, status: "Approved" } : d,
        ),
        pendingDoctors: state.pendingDoctors.filter((d) => d._id !== id),
      }));

      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to approve doctor",
        loading: false,
      });
      throw error;
    }
  },

  // ── Reject Doctor (Admin) ─────────────────────────────────────────────────────
  // PUT /doctor/reject-doctor/:id
  // Controller sets status → "Rejected"; returns { success, message }
  rejectDoctor: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(`doctor/reject-doctor/${id}`);

      set((state) => ({
        loading: false,
        allDoctors: state.allDoctors.map((d) =>
          d._id === id ? { ...d, status: "Rejected" } : d,
        ),
        pendingDoctors: state.pendingDoctors.filter((d) => d._id !== id),
      }));

      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to reject doctor",
        loading: false,
      });
      throw error;
    }
  },

  // ── Pending Doctors (Admin) ───────────────────────────────────────────────────
  // GET /doctor/pending-doctors
  // Controller returns { pendingDoctors: [...] }
  getPendingDoctors: async () => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.get("doctor/pending-doctors");

      set({
        loading: false,
        pendingDoctors: data.pendingDoctors || [],
      });

      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message || "Failed to fetch pending doctors",
        loading: false,
      });
      throw error;
    }
  },
}));
