import { Team } from "@/types";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type ThemeColor = "light" | "dark" | "auto";

export type UserPreferences = {
  readonly theme: ThemeColor;
  readonly paginationSize: number;
  readonly language: string;
  readonly team: Team | null;
};

const defaultPreferences: UserPreferences = {
  theme: "light",
  paginationSize: 10,
  language: "es",
  team: null,
};

export type UserActions = {
  setPaginationSize: (paginationSize: number) => void;
  setThemeColor: (theme: ThemeColor) => void;
  setLanguage: (language: string) => void;
  setTeam: (team: Team | null) => void;
};

type UserStore = UserPreferences & UserActions;

export const userStoreSlice: StateCreator<UserStore> = (set) => ({
  ...defaultPreferences,
  setPaginationSize: (paginationSize: number) => {
    set((state) => ({
      ...state,
      paginationSize,
    }));
  },
  setThemeColor: (theme: ThemeColor) => {
    set((state) => ({
      ...state,
      theme,
    }));
  },
  setLanguage: (language: string) => {
    set((state) => ({
      ...state,
      language,
    }));
  },
  setTeam: (team: Team | null) => {
    set((state) => ({
      ...state,
      team,
    }));
  },
});

const persistedUserStore = persist(userStoreSlice, {
  name: "user",
  partialize: (state) => ({
    ...state,
  }),
});

export const useUserStore = create(persistedUserStore);
