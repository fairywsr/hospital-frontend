import axiosInstance from "../utils/axios";
// approve reject all doctors, apis from doctor controller handle here
export const useAdminStore = create((set, get) => ({
  doctor: null,
  admin: null,
  loading: null,
  allDoctors: [],
  error: null,

  registerAdmin: async (admindata) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.post("admin/register", admindata);
      set({
        loading: false,
        admin: data.admin,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to register admin",
        loading: false,
      });
    }
  },

  loginAdmin: async (admindata) => {
    try {
      set({
        loading: true,
        error: null,
      });
      const { data } = axiosInstance.post("admin/login", admindata);
      set({ loading: false, admin: data.admin });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to login admin",
        loading: false,
      });
    }
  },

  logOutAdmin: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.post("admin/logout");
      set({ loading: false, admin: null });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to admin logout",
        loading: false,
      });
    }
  },

  adminProfile: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });
      const { data } = await axiosInstance.get(`admin/profile/${id}`);
      set({
        loading: false,
        admin: data.admin,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch profile",
        loading: false,
      });
    }
  },

  updatePassword: async (adminData) => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.put(
        "admin/update-password",
        adminData,
      );
      set({
        loading: false,
        admin: data.admin,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to reset Password",
        loading: false,
      });
    }
  },

  updateProfile: async (id, adminData) => {
    try {
      set({ loading: true, error: null });
      const { data } = axiosInstance.put(
        `admin/update-profile${id}`,
        adminData,
      );
      set({ loading: false, admin: data.admin });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to update profile",
        loading: false,
      });
    }
  },

  deleteProfile: async (id) => {
    try {
      set({ loading: true, error: null });
      const axiosInstance = await axiosInstance.delete(
        `/admin/profile-delete${id}`,
      );
      set({
        loading: false,
        admin: null,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to delete profile",
        loading: false,
      });
    }
  },

  resetPasswordRequest: async (adminData) => {
    try {
      set({
        loading: true,
        error: null,
      });
      const { data } = axiosInstance.post(
        "admin/reset-password-request",
        adminData,
      );
      set({
        loading: false,
        admin: data.admin,
      });

      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to send email",
        loading: false,
      });
    }
  },

  resetPassword: async (token, adminData) => {
    try {
      set({
        loading: true,
        error: null,
      });
      const { data } = await axiosInstance.put(`admin/reset-password/${token}`);
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to reset password",
        loading: false,
      });
    }
  },

  approveDoctor: async (id, profileStatus) => {
    try {
      set({ loading: true, error: null });
      const { data } = axiosInstance.put(
        `doctor/approve-doctor${id}`,
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

  rejectDoctor: async (id, profileStatus) => {
    try {
      set({
        loading: true,
        error: null,
      });
      const { data } = await axiosInstance.put(
        `doctor/pending-status${id}`,
        profileStatus,
      );
      set({
        loading: false,
        doctor: data.doctor,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to reject doctor",
        loading: false,
      });
    }
  },

  allPendingDoctors: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosInstance.get(`doctor/pending-status`);
      set({ loading: false, doctor: data.doctor });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetched doctors",
        loading: false,
      });
    }
  },
}));
