import { User } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  getUser: () => User | null;
  updateUserCoins: (newCoins: number) => void;
}

export const useUserStore = create(
  devtools(
    persist<UserState>(
      (set, get) => ({
        user: null,
        setUser: (user: User) => set({ user }),
        getUser: () => get().user,
        updateUserCoins: (newCoins: number) => {
          const currentUser = get().user;
          if (currentUser) {
            set({ user: { ...currentUser, coins: newCoins } });
          }
        },
      }),
      {
        name: "user-storage",
      }
    ),
    {
      name: "user-store",
      trace: true,
    }
  )
);
