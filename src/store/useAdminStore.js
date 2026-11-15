import { create } from "zustand";
let abc;
export const userUserStore = create((set, get) => {
  return (abc, "I am user in store ");
});
