import { create } from "zustand";
import { UserType } from "@shared/types";

type FollowUnfollowStore = {
  followUnfollowUsers: UserType[];
  setFollowUnfollowUsers: (users: UserType[]) => void;
  follow: (user: UserType) => void;
  unfollow: (user: UserType) => void;
};

export const useFollowUnfollowStore = create<FollowUnfollowStore>((set) => ({
  followUnfollowUsers: [],

  setFollowUnfollowUsers: (users) => {
    set({ followUnfollowUsers: users });
  },

  follow: (user) => {
    set((state) => ({
      followUnfollowUsers: [...state.followUnfollowUsers, user],
    }));
  },

  unfollow: (user) => {
    set((state) => ({
      followUnfollowUsers: state.followUnfollowUsers.filter(
        (users) => users._id !== user._id,
      ),
    }));
  },
}));
