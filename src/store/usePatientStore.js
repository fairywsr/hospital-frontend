import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const usePatientStore = create((set, get) => ({
  user: null,
  patients: [],
  error: null,
  loading: false,

  // ── Register ──────────────
  register: async (userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post(
        "patient/register-patient",
        userData,
      );

      set({ user: data.user, loading: false });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Registration Failed",
        loading: false,
      });
      throw error;
    }
  },

  // ── Login ────────────────────────────
  login: async (userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post(
        "patient/patient-login",
        userData,
      );

      // Controller returns { success, message, patient, token }
      const patientUser = data.patient || data.user;
      set({ user: patientUser, loading: false });

      useAuthStore.getState().setUser({
        ...patientUser,
        role: "Patient",
      });

      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Login Failed",
        loading: false,
      });
      throw error;
    }
  },

  // ── Logout ─────────────
  logout: async () => {
    try {
      set({ loading: true, error: null });

      await axiosInstance.post("patient/patient-logout");

      set({ user: null, patients: [], loading: false });
      useAuthStore.getState().clearUser();
    } catch (error) {
      // Even if the server call fails, clear client-side state
      set({
        user: null,
        patients: [],
        loading: false,
        error: error?.response?.data?.message || "Logout failed",
      });
      useAuthStore.getState().clearUser();
    }
  },

  // ── Patient Profile ───────────────────
  patientProfile: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.get(`patient/patient/${id}`);

      set({ loading: false, user: data.user });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Profile not found",
        loading: false,
      });
      throw error;
    }
  },

  // ── Update Profile ─────────────
  updateProfile: async (id, userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `patient/update-profile/${id}`,
        userData,
      );

      // Controller returns { patient } after update
      const updated = data.patient || data.user;
      set({ loading: false, user: updated });
      if (updated) {
        const currentAuth = useAuthStore.getState().user;
        useAuthStore.getState().setUser({ ...currentAuth, ...updated });
      }
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Profile not updated",
        loading: false,
      });
      throw error;
    }
  },

  // ── Delete Profile ────────────
  deleteProfile: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.delete(
        `patient/delete-profile/${id}`,
      );

      set({ loading: false, user: null });
      useAuthStore.getState().clearUser();
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Profile not deleted",
        loading: false,
      });
      throw error;
    }
  },

  // ── Reset Password Request ────────
  resetPasswordRequest: async (userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        "patient/reset-password-request",
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

  // ── Reset Password (via token) ─────────
  resetPassword: async (token, userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `patient/reset-password/${token}`,
        userData,
      );

      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Password not reset",
        loading: false,
      });
      throw error;
    }
  },

  // ── Update Password (while logged in) ─────────
  updatePassword: async (userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        "patient/update-password",
        userData,
      );

      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Password not updated",
        loading: false,
      });
      throw error;
    }
  },

  // ── All Patients (Doctor/Admin only) ───────────
  getAllPatients: async () => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.get("patient/all-patients");

      set({
        patients: data.allPatients || data.patients || [],
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          error.message ||
          "Failed to fetch patients",
        loading: false,
      });
      throw error;
    }
  },
}));
