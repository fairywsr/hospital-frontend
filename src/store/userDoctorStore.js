import axiosInstance from "../utils/axios";

export const useDoctorStore = create((set, get) => ({
  doctor: null,
  loading: false,
  error: null,

  registerDoctor: async (doctorData) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.post(
        "/doctor/register-doctor",
        doctorData,
      );
      set({ loading: true });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "registeration failed",
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
        "/doctor/doctor/login",
        doctorData,
      );
      set({
        loading: false,
        doctor: data.doctor,
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
      set({ loading: false, error: null });

      const { data } = axiosInstance.put(
        `/doctor/update-profile/${id}`,
        doctorData,
      );
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

  deleteProfile: async (id) => {
    try {
      set({ loading: true, error: null });
      const { data } = axiosInstance.delete(`doctor/delete-profile/${id}`);
      set({
        loading: false,
        doctor: data.doctor,
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
    } catch (error) {
      set({
        error: error?.response?.data?.message || "failed to reset Password",
        loading: false,
      });
      throw error;
    }
  },

  resetPassword: async (id, token) => {
    try {
      set({ loading: true, error: null });
      const { data } = axiosInstance.post(
        `doctor/reset-password/${token}`,
        doctorData,
      );
      set({ loading: false, doctor: data?.doctor });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "failed to reset password",
        loading: false,
      });
      throw error;
    }
  },

  //   doctor api for admin all-doctor
  allDoctors: async () => {},
}));
