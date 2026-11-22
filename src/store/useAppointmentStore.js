import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

const getRole = () => useAuthStore.getState().user?.role;

export const useAppointmentStore = create((set) => ({
  appointments: [],
  appointment: null,
  error: null,
  loading: false,

  // ── Patient: Create Appointment ────────────
  createNewAppointment: async (appointmentData) => {
    try {
      if (getRole() !== "Patient") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.post(
        "appointments/new-appointment",
        appointmentData,
      );
      // Append the new appointment to the existing list
      set((state) => ({
        loading: false,
        appointments: state.appointments
          ? [data.appointment, ...state.appointments]
          : [data.appointment],
      }));
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to book appointment",
        loading: false,
      });
      throw error;
    }
  },

  // ── Patient: Get My Appointments ──────────
  getPatientAppointment: async () => {
    try {
      if (getRole() !== "Patient") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.get("appointments/all-appointments");
      set({ loading: false, appointments: data.appointments });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch appointments",
        loading: false,
      });
      throw error;
    }
  },

  // ── Doctor: Get My Appointments ───────────
  getDoctorAppointment: async () => {
    try {
      if (getRole() !== "Doctor") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.get(
        "appointments/doctor-appointments",
      );
      set({ loading: false, appointments: data.appointments });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch appointments",
        loading: false,
      });
      throw error;
    }
  },

  // ── Doctor: Approve Appointment ──────
  approveAppointmentStatus: async (id) => {
    try {
      if (getRole() !== "Doctor") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.put(`appointments/approve/${id}`);
      set((state) => ({
        loading: false,
        appointments: state.appointments.map((a) =>
          a._id === id ? { ...a, status: "Approved" } : a,
        ),
      }));
      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message || "Failed to approve appointment",
        loading: false,
      });
      throw error;
    }
  },

  // ── Doctor: Reject Appointment ───────────
  rejectAppointmentStatus: async (id) => {
    try {
      if (getRole() !== "Doctor") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.put(`appointments/reject/${id}`);
      set((state) => ({
        loading: false,
        appointments: state.appointments.map((a) =>
          a._id === id ? { ...a, status: "Rejected" } : a,
        ),
      }));
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to reject appointment",
        loading: false,
      });
      throw error;
    }
  },

  // ── Doctor/Patient: Cancel Appointment ───
  cancelAppointment: async (id) => {
    try {
      const role = getRole();
      if (role !== "Doctor" && role !== "Patient") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.put(`appointments/cancel/${id}`);
      set((state) => ({
        loading: false,
        appointments: state.appointments.map((a) =>
          a._id === id ? { ...a, status: "Cancelled" } : a,
        ),
      }));
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to cancel appointment",
        loading: false,
      });
      throw error;
    }
  },

  // ── Admin: Get All Appointments ───────
  allAppointments: async () => {
    try {
      if (getRole() !== "Admin") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.get("appointments/all");
      set({ loading: false, appointments: data.allAppointments });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch appointments",
        loading: false,
      });
      throw error;
    }
  },

  // ── Admin: Appointment Detail ───────
  appointmentDetail: async (id) => {
    try {
      if (getRole() !== "Admin") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.get(`appointments/${id}`);
      set({ loading: false, appointment: data.appointment });
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

  // ── Admin: Get Appointments By Status ───
  appointmentByStatus: async (status) => {
    try {
      if (getRole() !== "Admin") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.get(`appointments/status/${status}`);
      set({ loading: false, appointments: data.appointments });
      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          "Failed to fetch appointments by status",
        loading: false,
      });
      throw error;
    }
  },

  // ── Admin: Update Appointment Status ───────
  updateAppointmentStatus: async (id, status) => {
    try {
      if (getRole() !== "Admin") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.put(
        `appointments/update-status/${id}`,
        { status },
      );
      set((state) => ({
        loading: false,
        appointments: state.appointments.map((a) =>
          a._id === id ? { ...a, status } : a,
        ),
      }));
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

  // ── Admin: Delete Appointment ─────────
  deleteAppointment: async (id) => {
    try {
      if (getRole() !== "Admin") {
        throw new Error("You are not allowed to access this api");
      }
      set({ loading: true, error: null });
      const { data } = await axiosInstance.delete(`appointments/delete/${id}`);
      set((state) => ({
        loading: false,
        appointments: state.appointments.filter((a) => a._id !== id),
      }));
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to delete appointment",
        loading: false,
      });
      throw error;
    }
  },
}));
