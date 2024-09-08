import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserSlice = create(
    persist(
        (set, get) => ({
            user: {},

            setUser: (user) => set({ user }),

            getUser: () => get().user, // Access the current state
        }),
        {
            name: "user-storage", // name of the item in storage (must be unique)
        }
    )
);

export default useUserSlice;
