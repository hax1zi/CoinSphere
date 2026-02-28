import { req } from "@/services/api";
import { useEffect, useState } from "react";
import type { CryptocoinType, GlobalMarketDataType } from "./types";
import { isMobile } from "@/utils/mobile";
import { useMainCoin } from "@/store/mainCoin";

const CACHE_KEY_COINS_MARKET = "coinsMarket";
const CACHE_KEY_GLOBAL = "globalMarketData";
const CACHE_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutos

export default function useCryptocurrencies() {
    const { mainCoin } = useMainCoin();
    const [cryptocoins, setCryptocoins] = useState<CryptocoinType[]>([]);
    const [globalMarketData, setGlobalMarketData] = useState<GlobalMarketDataType | null>(null);
    const [compactRows, setCompactRows] = useState<"small" | "medium" | "big">(isMobile === true ? "small" : "big");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cacheIsExist = (cached: string | null, setState: any): boolean => {
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
                setState(data);
                return true;
            }
        }
        return false;
    };

    const getDataGlobalMarket = () => {
        const cached = localStorage.getItem(CACHE_KEY_GLOBAL);
        if (cacheIsExist(cached, setGlobalMarketData)) return;

        req.get("/global")
            .then((res) => {
                setGlobalMarketData(res.data.data);
                localStorage.setItem(CACHE_KEY_GLOBAL, JSON.stringify({ data: res.data.data, timestamp: Date.now() }));
            })
            .catch(console.error);
    };

    const getCoins = () => {
        const cacheKey = `${CACHE_KEY_COINS_MARKET}_${mainCoin}`;
        const cached = localStorage.getItem(cacheKey);

        if (cacheIsExist(cached, setCryptocoins)) return;

        req.get(`/coins/markets?vs_currency=${mainCoin}&price_change_percentage=1h`)
            .then((res) => {
                setCryptocoins(res.data);
                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({
                        data: res.data,
                        timestamp: Date.now(),
                    }),
                );
            })
            .catch(console.error);
    };

    useEffect(() => {
        getDataGlobalMarket();
        getCoins();
    }, [mainCoin]);

    const handleCompactRows = (padding: "small" | "medium" | "big") => {
        setCompactRows(padding);
    };
    return { cryptocoins, globalMarketData, handleCompactRows, compactRows, mainCoin };
}
