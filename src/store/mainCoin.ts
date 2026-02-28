import { create } from "zustand";

type Currency = "usd" | "brl" | "btc";

type MainCoinType = {
    mainCoin: Currency;
    setMainCoin: (coin: Currency) => void;
};

export const useMainCoin = create<MainCoinType>((set) => ({
    mainCoin: "usd",
    setMainCoin: (coin) => set({ mainCoin: coin }),
}));
