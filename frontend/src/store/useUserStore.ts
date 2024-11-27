import { create } from "zustand/react";
import { UserType } from "@shared/types";

type useUserStoreType = {
  user: null | UserType;

  setUser: (user: UserType) => void;
  logout: () => void;
};

export const useUserStore = create<useUserStoreType>((set) => ({
  user: null,

  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
