import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    theme: "light" | "dark" | "system";
    setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUserState = create<UserState>()(
    persist(
        (set) => ({
            theme: "light",
            setTheme: (theme: "light" | "dark" | "system") =>
                set(() => ({ theme: theme })),
        }),
        {
            name: "user-data",
        },
    ),
);
