import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const useDoctorStore = create((set) => ({
  doctor: null,
  allDoctors: [],
  pendingDoctors: [],
  loading: false,
  error: null,

  // ── Register ─────────
  registerDoctor: async (doctorData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post(
        "doctor/register-doctor",
        doctorData,
      );

      if (data?.success === false) {
        throw new Error(data?.message || "Registration failed");
      }

      set({ loading: false, doctor: data.doctor });
      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          error?.message ||
          "Registration failed",
        loading: false,
      });
      throw error;
    }
  },

  // ── Login ──────────────────
  loginDoctor: async (doctorData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post("doctor/login", doctorData);

      if (data?.success === false || !data?.success) {
        throw new Error(data?.message || "Invalid doctor credentials");
      }

      const doctorUser = data.doctor || data.user;
      if (!doctorUser) {
        throw new Error(data?.message || "Doctor credentials not found");
      }

      set({ loading: false, doctor: doctorUser, error: null });

      useAuthStore.getState().setUser({
        ...doctorUser,
        role: "Doctor",
      });

      return data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid doctor credentials. Please check your email and password.";
      set({
        error: errorMsg,
        loading: false,
      });
      throw error;
    }
  },

  // ── Logout ──────
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

  // ── Doctor Profile ─────────
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

  // ── Edit Profile ──────────────────
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

  // ── Delete Profile ───────
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

  // ── Reset Password Request ─────────────
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

  // ── Reset Password (via token) ────

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

  // ── Update Password (while logged in) ─────
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

  // ── Get All Doctors (Admin) ─────────
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

  // ── Approve Doctor (Admin) ────────
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

  // ── Reject Doctor (Admin) ─────────────
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

  // ── Pending Doctors (Admin) ──────────
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
