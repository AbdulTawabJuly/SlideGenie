import { User } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  shouldAnimateCoins: boolean;
  setUser: (user: User) => void;
  getUser: () => User | null;
  updateUserCoins: (newCoins: number, animate?: boolean) => void;
}

export const useUserStore = create(
  devtools(
    persist<UserState>(
      (set, get) => ({
        user: null,
        shouldAnimateCoins: false,
        setUser: (user: User) =>
          set({ user, shouldAnimateCoins: false }),
        getUser: () => get().user,
        updateUserCoins: (newCoins: number, animate: boolean = true) => {
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, coins: newCoins },
              shouldAnimateCoins: animate,
            });
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