import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

const role = useAuthStore.getState().user?.role;
export const useAppointmentStore = create((set, get) => ({
  appointments: [],
  error: null,
  loading: false,

  createNewAppointment: async (appointmentData) => {
    try {
      if (role !== "Patient") {
        throw new Error("You are not allowed to acces this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.post(
        `appointments/new-appointment`,
        appointmentData,
      );
      set({
        loading: false,
        appointments: data.appointments,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to book appointment",
        loading: false,
      });
      throw error;
    }
  },

  getPatientAppointment: async () => {
    try {
      if (role !== "Patient") {
        throw new Error("You are not allowed to acces this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.get(`appointments/all-appointments`);
      set({ loading: false, appointments: data.appointments });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch appointment",
        loading: false,
      });
      throw error;
    }
  },

  getDoctorAppointment: async () => {
    if (role !== "Doctor") {
      throw new Error("You are not allowed to acces this api");
    }
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.get(
        `appointments/doctor-appointments`,
      );
      set({ loading: false, appointments: data.appointments });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to register admin",
        loading: false,
      });
      throw error;
    }
  },

  approveAppointmentStatus: async (id) => {
    try {
      if (role !== "Doctor") {
        throw new Error("You are not allowed to acces this api");
      }
      set({
        loading: true,
        error: null,
      });

      const { data } = await axiosInstance.put(`appointments/approve/${id}`);
      set({ loading: false, appointments: data.appointment });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Failed to update appointment status",
        loading: false,
      });
      throw error;
    }
  },

  rejectAppointmentStatus: async (id) => {
    try {
      if (role !== "Doctor") {
        throw new Error("You are not allowed to acces this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.put(`appointments/reject/${id}`);
      set({ loading: false, appointment: data.appointment });
      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Failed to update appointment status",
        loading: false,
      });
      throw error;
    }
  },

  cancelAppointment: async (id) => {
    try {
      if (role !== "Doctor") {
        throw new Error("You are not allowed to acces this api");
      }
      set({ loading: false, error: null });
      const { data } = await axiosInstance.put(`appointment/cancel/${id}`);
      set({
        loading: false,
        appointments: data.appointment,
      });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Failed to update appointment status",
        loading: false,
      });
      throw error;
    }
  },

  allAppointments: async () => {
    try {
      if (role !== "Admin") {
        throw new Error("You are not allowed to acces this api");
      }
      set({
        loading: true,
        error: null,
      });
      const { data } = await axiosInstance.get(`appointments/all`);
      set({
        loading: false,
        appointments: data.appointments,
      });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message || "Failed to  fetch appointments",
        loading: false,
      });
      throw error;
    }
  },

  appointmentDetail: async (id) => {
    if (role !== "Admin") {
      throw new Error("You are not allowed to acces this api");
    }
    try {
      set({
        loading: true,
        error: null,
      });
      const { data } = await axiosInstance.get(`/appointments/${id}`);
      set({
        loading: false,
        appointments: data.appointment,
      });
      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Failed to fetch appointment detail",
        loading: false,
      });
      throw error;
    }
  },

  appointmentStatus: async (appointmentStatus) => {
    try {
      if (role !== "Admin") {
        throw new Error("You are not allowed to acces this api");
      }
      set({
        loading: true,
        error: null,
      });
      const { data } = axiosInstance.get(
        `appointments/status/${appointmentStatus}`,
      );
      set({
        loading: true,
        appointment: data.appointment,
      });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Failed to update appointment status",
        loading: false,
      });
      throw error;
    }
  },

  updateAppointmentStatus: async (id, appointmentStatus) => {
    try {
      if (role !== "Admin") {
        throw new Error("You are not allowed to acces this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.put(
        `appointments/update-status/${id}`,
        appointmentStatus,
      );
      set({
        loading: false,
        appointment: data.appointment,
      });
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Failed to update appointment status",
        loading: false,
      });
      throw error;
    }
  },

  deleteAppointment: async (id) => {
    try {
      if (role !== "Admin") {
        throw new Error("You are not allowed to acces this api");
      }
      set({
        loading: true,
        error: null,
      });
      const { data } = await axiosInstance.delete(`appointments/delete/${id}`);
      set({
        loading: false,
        appointment: null,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to delete appointment",
        loading: false,
      });
    }
  },
}));
