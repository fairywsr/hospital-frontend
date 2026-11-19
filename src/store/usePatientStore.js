import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const usePatientStore = create((set, get) => ({
  user: null,
  patients: [],
  error: null,
  loading: false,

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

  login: async (userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.post(
        "patient/patient-login",
        userData,
      );

      set({ user: data.user, loading: false });
      useAuthStore.getState().setUser({
        ...data.patient,
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

  updateProfile: async (id, userData) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.put(
        `patient/update-profile/${id}`,
        userData,
      );

      set({ loading: false, user: data.user });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Profile not updated",
        loading: false,
      });
      throw error;
    }
  },

  deleteProfile: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.delete(
        `patient/delete-profile/${id}`,
      );

      set({ loading: false, user: null });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Profile not deleted",
        loading: false,
      });
      throw error;
    }
  },

  // Api for Doctor -- all-patients
  getAllPatients: async () => {
    try {
      if (get().user?.role !== "Doctor") {
        throw new Error("Only doctors can access all patients");
      }

      set({ loading: true, error: null });

      const { data } = await axiosInstance.get("patient/all-patients");

      set({
        patients: data.patients,
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
