import { create } from "zustand";

export const useChatStore = create((set) => ({
  sendMessages: async () => {},

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
