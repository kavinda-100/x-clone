import { create } from "zustand/react";
import { UserType } from "@shared/types";
import { FollowerUserType, FollowingUserType, PostType } from "../types";

type selectedUserType = {
  selectedUser: null | UserType;
  totalFollowers: number;
  totalFollowing: number;
  totalLikes: number;
  Followers: FollowerUserType[];
  Following: FollowingUserType[];
  setSelectedUser: (user: UserType) => void;
  setTotalFollowers: (totalFollowers: number) => void;
  setTotalFollowing: (totalFollowing: number) => void;
  setTotalLikes: (totalLikes: number) => void;
  setFollowers: (Followers: FollowerUserType[]) => void;
  setFollowing: (Following: FollowingUserType[]) => void;
  removeFollowing: (followerUserId: string) => void;
  userLikedPosts: PostType[];
  setUserLikedPosts: (userLikedPosts: PostType[]) => void;
};

export const useSelectedUser = create<selectedUserType>((set) => ({
  selectedUser: null,
  totalFollowers: 0,
  totalFollowing: 0,
  totalLikes: 0,
  Followers: [],
  Following: [],
  userLikedPosts: [],

  setSelectedUser: (user) => set({ user }),
  setTotalFollowers: (totalFollowers) => set({ totalFollowers }),
  setTotalFollowing: (totalFollowing) => set({ totalFollowing }),
  setTotalLikes: (totalLikes) => set({ totalLikes }),
  setFollowers: (Followers) => set({ Followers }),
  setFollowing: (Following) => set({ Following }),
  removeFollowing: (followerUserId) =>
    set((state) => ({
      Following: state.Following.filter(
        (following) => following.following_user_id !== followerUserId,
      ),
    })),
  setUserLikedPosts: (userLikedPosts) => set({ userLikedPosts }),
}));
