import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const useDoctorStore = create((set, get) => ({
  allDoctors: [],
  doctor: null,
  loading: false,
  error: null,

  registerDoctor: async (doctorData) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.post(
        "doctor/register-doctor",
        doctorData,
      );
      set({ loading: false, doctor: data.doctor || data.user });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Registration failed",
        loading: false,
      });
      throw error;
    }
  },

  loginDoctor: async (doctorData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const { data } = await axiosInstance.post(
        "doctor/login",
        doctorData,
      );
      const doctorUser = data.doctor || data.user;
      set({
        loading: false,
        doctor: doctorUser,
      });

      useAuthStore.getState().setUser({
        ...doctorUser,
        role: "Doctor",
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

  doctorProfile: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosInstance.get(`doctor/profile/${id}`);
      set({ loading: false, doctor: data.doctor });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "failed to fetc profile",
        loading: false,
      });
      throw error;
    }
  },

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
        error: error?.response?.data?.message || "failed to fetch profile",
        loading: false,
      });
      throw error;
    }
  },

  deleteProfile: async (id) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.delete(`doctor/delete-profile/${id}`);
      set({
        loading: false,
        doctor: data.doctor || data.user,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "failed to delete profile",
        loading: false,
      });
      throw error;
    }
  },

  resetPasswordRequest: async (id, doctorData) => {
    try {
      set({ loading: true, error: null });
      const { data } = axiosInstance.put(
        `doctor/reset-password-request${id}`,
        doctorData,
      );
      set({ loading: false, doctor: data?.doctor });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "failed to reset Password",
        loading: false,
      });
      throw error;
    }
  },

  resetPassword: async (id, token, doctorData) => {
    try {
      set({ loading: true, error: null });
      const { data } = axiosInstance.post(
        `doctor/reset-password/${token}`,
        doctorData,
      );
      set({ loading: false, doctor: data?.doctor });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "failed to reset password",
        loading: false,
      });
      throw error;
    }
  },

  updatePassword: async (id, doctorData) => {
    try {
      set({
        loading: true,
        error: null,
      });
      const { data } = axiosInstance.post(
        `doctor/update-password${id}`,
        doctorData,
      );
      set({
        loading: false,
        doctor: data?.doctor,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "failed to fetc profile",
        loading: false,
      });
      throw error;
    }
  },

  //   doctor api for admin all-doctor
  getAllDoctors: async () => {
    try {
      if (get().doctor?.role !== "Doctor") {
        throw new Error("You are not allowed to acces this api");
      }
      set({
        loading: true,
        error: null,
      });
      const { data } = axiosInstance.get("doctors-all-doctors");
      set({
        loading: false,
        allDoctors: data,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "failed to fetched doctors",
        loading: false,
      });
      throw error;
    }
  },
}));
