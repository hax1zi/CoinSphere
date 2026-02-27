import { req } from "@/services/api";
import { useEffect, useState } from "react";
import type { CoinDetails } from "./types";

interface UseCoinProps {
    coinId: string | undefined;
}

const CACHE_EXPIRATION_MS = 10 * 60 * 1000;
const MAX_CACHE_COINS = 2;

export default function useCoin({ coinId }: UseCoinProps) {
    const CACHE_KEY_COIN = `coin_${coinId}`;

    const [coinData, setCoinData] = useState<CoinDetails | null>(null);

    const cacheCoinLimiter = () => {
        const keys = Object.keys(localStorage).filter((key) => key.startsWith("coin_"));

        if (keys.length <= MAX_CACHE_COINS) return;

        const cacheItems = keys
            .map((key) => {
                const value = localStorage.getItem(key);
                if (!value) return null;

                const parsed = JSON.parse(value);
                return {
                    key,
                    timestamp: parsed.timestamp,
                };
            })
            .filter(Boolean) as { key: string; timestamp: number }[];
        cacheItems.sort((a, b) => a.timestamp - b.timestamp);

        const itemsToRemove = cacheItems.length - MAX_CACHE_COINS;

        for (let i = 0; i < itemsToRemove; i++) {
            localStorage.removeItem(cacheItems[i].key);
        }
    };

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

    const getCoinData = () => {
        const cached = localStorage.getItem(CACHE_KEY_COIN);
        if (cacheIsExist(cached, setCoinData)) return;

        req.get("/coins/" + coinId)
            .then((res) => {
                setCoinData(res.data);
                localStorage.setItem(CACHE_KEY_COIN, JSON.stringify({ data: res.data, timestamp: Date.now() }));
            })
            .catch(console.error);
    };

    useEffect(() => {
        if (coinId) {
            cacheCoinLimiter();
            getCoinData();
        }
    }, [coinId]);

    const mainValuesArray = [
        {
            label: "Capitalização de mercado",
            value: coinData && coinData.market_data.market_cap.usd,
            type: "amount" as const,
        },
        {
            label: "Avaliação totalmente diluída",
            value: coinData && coinData.market_data.fully_diluted_valuation.usd,
            type: "amount" as const,
        },
        {
            label: "Negociação 24h",
            value: coinData && coinData.market_data.total_volume.usd,
            type: "amount" as const,
        },
        {
            label: "Em circulação",
            value: coinData && coinData.market_data.circulating_supply,
            type: "number" as const,
        },
        {
            label: "Fornecimento total ",
            value: coinData && coinData.market_data.total_supply,
            type: "number" as const,
        },
        {
            label: "Fornecimento Máximo",
            value: coinData && coinData.market_data.max_supply,
            type: "number" as const,
        },
    ];

    return { coinData, mainValuesArray };
}
