import { create } from "zustand/react";
import { messageType, messageUserType, onlineUserType } from "../types";

type ChatStore = {
  Messages: messageType[];
  users: messageUserType[];
  selectedUser: messageUserType | null;
  onlineUsers: onlineUserType[];

  setMessages: (messages: messageType[]) => void;
  setUsers: (users: messageUserType[]) => void;
  setSelectedUser: (user: messageUserType) => void;
  setSelectedUserToNull: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  Messages: [],
  users: [],
  selectedUser: null,
  onlineUsers: [],

  setMessages: (messages) => set({ Messages: messages }),
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSelectedUserToNull: () => set({ selectedUser: null }),
}));
