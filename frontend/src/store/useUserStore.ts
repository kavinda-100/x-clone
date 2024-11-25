import { create } from "zustand/react";
import { UserType } from "@shared/types";

type useUserStoreType = {
  user: null | UserType;
  totalFollowers: number;
  totalFollowing: number;
  totalLikes: number;
  setUser: (user: UserType) => void;
  logout: () => void;
  setTotalFollowers: (totalFollowers: number) => void;
  setTotalFollowing: (totalFollowing: number) => void;
  setTotalLikes: (totalLikes: number) => void;
};

export const useUserStore = create<useUserStoreType>((set) => ({
  user: null,
  totalFollowers: 0,
  totalFollowing: 0,
  totalLikes: 0,

  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  setTotalFollowers: (totalFollowers) => set({ totalFollowers }),
  setTotalFollowing: (totalFollowing) => set({ totalFollowing }),
  setTotalLikes: (totalLikes) => set({ totalLikes }),
}));
