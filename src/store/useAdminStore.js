import { create } from "zustand";
let abc;
export const useAdminStore = create((set, get) => {
  return (abc, "I am user in store ");
});
