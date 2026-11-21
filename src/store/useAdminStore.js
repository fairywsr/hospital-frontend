import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const useAdminStore = create((set) => ({
  doctor: null,
  doctors: [],
  admin: null,
  loading: false,
  error: null,

  // Register Admin
  registerAdmin: async (adminData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post("admin/register", adminData);

      const adminUser = data.admin || data.user;
      set({ loading: false, admin: adminUser });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to register admin",
        loading: false,
      });
      throw error;
    }
  },

  // Login Admin
  loginAdmin: async (adminData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post("admin/login", adminData);

      const adminUser = data.admin || data.user;
      set({ loading: false, admin: adminUser });

      useAuthStore.getState().setUser({
        ...adminUser,
        role: "Admin",
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to login admin",
        loading: false,
      });
      throw error;
    }
  },

  // Logout Admin
  logOutAdmin: async () => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post("admin/logout");

      set({ loading: false, admin: null });
      useAuthStore.getState().clearUser();
      return data;
    } catch (error) {
      // Clear client-side state even if server call fails
      set({ admin: null, loading: false, error: error?.response?.data?.message || "Failed to admin logout" });
      useAuthStore.getState().clearUser();
    }
  },

  // Admin Profile
  adminProfile: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.get(`admin/profile/${id}`);

      // Controller returns key "profile"
      const adminUser = data.profile || data.admin;
      set({ loading: false, admin: adminUser });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch profile",
        loading: false,
      });
    }
  },

  // Update Password
  updatePassword: async (adminData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        "admin/update-password",
        adminData,
      );

      set({ loading: false, admin: data.admin });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to reset password",
        loading: false,
      });
    }
  },

  // Update Profile
  updateProfile: async (id, adminData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `admin/update-profile/${id}`,
        adminData,
      );

      set({ loading: false, admin: data.admin });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to update profile",
        loading: false,
      });
    }
  },

  // Delete Profile
  deleteProfile: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.delete(`admin/profile-delete/${id}`);

      set({ loading: false, admin: null });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to delete profile",
        loading: false,
      });
    }
  },

  // Reset Password Request
  resetPasswordRequest: async (adminData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post(
        "admin/reset-password-request",
        adminData,
      );

      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to send email",
        loading: false,
      });
    }
  },

  // Reset Password
  resetPassword: async (token, adminData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `admin/reset-password/${token}`,
        adminData,
      );

      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to reset password",
        loading: false,
      });
    }
  },

  // Approve Doctor
  approveDoctor: async (id, profileStatus) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `doctor/approve-doctor/${id}`,
        profileStatus,
      );

      set({ loading: false, doctor: data.doctor });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to approve doctor",
        loading: false,
      });
    }
  },

  // Reject Doctor
  rejectDoctor: async (id, profileStatus) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `doctor/pending-status/${id}`,
        profileStatus,
      );

      set({ loading: false, doctor: data.doctor });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to reject doctor",
        loading: false,
      });
    }
  },

  // All Pending Doctors
  allPendingDoctors: async () => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.get("doctor/pending-status");

      set({ loading: false, doctors: data.doctors });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch doctors",
        loading: false,
      });
    }
  },
}));
