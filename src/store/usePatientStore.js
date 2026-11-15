import axiosInstance from "../utils/axios";

export const usePatientStore = create((set) => ({
  user: null,
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
        error: error?.response?.data?.message || "Registeration Failed",
        loading: false,
      });
      throw error;
    }
  },

  login: async (userData) => {
    try {
      set({
        error: null,
        loading: true,
      });

      const { data } = await axiosInstance.post(
        "patient/patient-login",
        userData,
      );
      set({ loading: false, user: data.user });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Login Failed",
        loading: false,
      });
    }
  },

  resetPasswordRequest: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.put(
        "patient/reset-password-request",
        userDate,
      );
      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message || "error in password reset request",
      });
    }
  },

  resetPassword: async () => {
    try {
      set({
        loading: true,
        error: null,
      });
      const data = await axiosInstance.put(
        `patient-reset-password${token}`,
        userData,
      );

      set({
        loading: false,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Password not reset",
      });
    }
  },

  updatePassword: async () => {
    try {
      set({
        loading: true,
        error: null,
      });
      const { data } = await axiosInstance.put(`patient-update-password`);
      set({
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Password not updated",
      });
    }
  },

  patientProfile: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const { data } = await axiosInstance.get("/patient/patient/", id);
      set({
        loading: false,
        user: data.user,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.Dat?.message || "Profile not found",
        loading: false,
      });
    }
  },

  updateProfile: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const { data } = await axiosInstance.put(
        `patient/update-profile/${id}`,
        userData,
      );
      set({
        loading: false,
        user: data.user,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Profile not updated",
        loading: false,
      });
    }
  },

  deleteProfile: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const { data } = await axiosInstance.delete(
        `patient/delete-profile${id}`,
      );
      set({
        loading: false,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Profile not deleted",
        loading: false,
      });
    }
  },
}));
