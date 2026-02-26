import { req } from "@/services/api";
import { useEffect, useState } from "react";
import type { CryptocoinType, GlobalMarketDataType } from "./types";

const CACHE_KEY_COINS_MARKET = "coinsMarket";
const CACHE_KEY_GLOBAL = "globalMarketData";
const CACHE_EXPIRATION_MS = 5 * 60 * 1000; // 5 minutos

export default function useCryptocurrencies() {
    const [cryptocoins, setCryptocoins] = useState<CryptocoinType[]>([]);
    const [globalMarketData, setGlobalMarketData] = useState<GlobalMarketDataType | null>(null);

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
        const cached = localStorage.getItem(CACHE_KEY_COINS_MARKET);
        if (cacheIsExist(cached, setCryptocoins)) return;

        req.get("/coins/markets?vs_currency=usd")
            .then((res) => {
                setCryptocoins(res.data);
                localStorage.setItem(CACHE_KEY_COINS_MARKET, JSON.stringify({ data: res.data, timestamp: Date.now() }));
            })
            .catch(console.error);
    };

    useEffect(() => {
        getDataGlobalMarket();
        getCoins();
    }, []);

    return { cryptocoins, globalMarketData };
}
