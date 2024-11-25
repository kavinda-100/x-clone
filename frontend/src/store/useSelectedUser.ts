import { create } from "zustand/react";
import { UserType } from "@shared/types";

type selectedUserType = {
  selectedUser: null | UserType;
  totalFollowers: number;
  totalFollowing: number;
  totalLikes: number;
  setSelectedUserUser: (user: UserType) => void;
  setTotalFollowers: (totalFollowers: number) => void;
  setTotalFollowing: (totalFollowing: number) => void;
  setTotalLikes: (totalLikes: number) => void;
};

export const useSelectedUser = create<selectedUserType>((set) => ({
  selectedUser: null,
  totalFollowers: 0,
  totalFollowing: 0,
  totalLikes: 0,
  setSelectedUserUser: (user) => set({ selectedUser: user }),
  setTotalFollowers: (totalFollowers) => set({ totalFollowers }),
  setTotalFollowing: (totalFollowing) => set({ totalFollowing }),
  setTotalLikes: (totalLikes) => set({ totalLikes }),
}));
