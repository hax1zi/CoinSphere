import { create } from "zustand";

type MobileMenuActive = {
    isActive: boolean;
    toggleActive: () => void;
    desactivate: () => void;
};

export const useMobileMenuActive = create<MobileMenuActive>((set) => ({
    isActive: false,
    toggleActive: () => set((state) => ({ isActive: !state.isActive })),
    desactivate: () => set({ isActive: false }),
}));
