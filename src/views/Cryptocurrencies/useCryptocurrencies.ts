import { req } from "@/services/api";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { CryptocoinType, GlobalMarketDataType } from "./types";
import { isMobile } from "@/utils/mobile";
import { useMainCoin } from "@/store/mainCoin";
import { toast } from "sonner";

const CACHE_KEY_COINS_MARKET = "coinsMarket";
const CACHE_KEY_GLOBAL = "globalMarketData";
const CACHE_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutos
const COINS_CACHE_VERSION = "v2";

export default function useCryptocurrencies() {
    const [loading, setLoading] = useState(false);
    const { mainCoin } = useMainCoin();
    const [cryptocoins, setCryptocoins] = useState<CryptocoinType[]>([]);
    const [globalMarketData, setGlobalMarketData] = useState<GlobalMarketDataType | null>(null);
    const [compactRows, setCompactRows] = useState<"small" | "medium" | "big">(isMobile === true ? "small" : "medium");

    const [searchInput, setSearchInput] = useState("");
    const deferredSearchInput = useDeferredValue(searchInput);

    const filteredCoins = useMemo(() => {
        const term = deferredSearchInput.trim().toLowerCase();
        if (!term) return cryptocoins;

        return cryptocoins.filter((coin) => {
            return (
                coin.name.toLowerCase().includes(term) ||
                coin.symbol.toLowerCase().includes(term) ||
                coin.id.toLowerCase().includes(term)
            );
        });
    }, [cryptocoins, deferredSearchInput]);

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
        setLoading(true);

        req.get("/global")
            .then((res) => {
                setGlobalMarketData(res.data.data);
                localStorage.setItem(CACHE_KEY_GLOBAL, JSON.stringify({ data: res.data.data, timestamp: Date.now() }));
            })
            .catch((err) => {
                toast.error("Erro ao carregar dados do mercado global. Tente novamente mais tarde.", {
                    description: err.message,
                });
            })
            .finally(() => setLoading(false));
    };

    const getCoins = () => {
        const cacheKey = `${CACHE_KEY_COINS_MARKET}_${mainCoin}_${COINS_CACHE_VERSION}`;
        const cached = localStorage.getItem(cacheKey);

        if (cacheIsExist(cached, setCryptocoins)) return;
        setLoading(true);

        req.get(
            `/coins/markets?vs_currency=${mainCoin}&price_change_percentage=1h&sparkline=false&locale=en&per_page=100&page=1`,
        )
            .then((res) => {
                const compactCoins: CryptocoinType[] = res.data.map((coin: CryptocoinType) => ({
                    id: coin.id,
                    symbol: coin.symbol,
                    name: coin.name,
                    image: coin.image,
                    total_volume: coin.total_volume,
                    current_price: coin.current_price,
                    market_cap: coin.market_cap,
                    price_change_percentage_24h: coin.price_change_percentage_24h,
                    price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency,
                }));

                setCryptocoins(compactCoins);
                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({
                        data: compactCoins,
                        timestamp: Date.now(),
                    }),
                );
            })
            .catch((err) => {
                toast.error("Erro ao carregar dados das criptomoedas. Tente novamente mais tarde.", {
                    description: err.message,
                });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getDataGlobalMarket();
        getCoins();
    }, [mainCoin]);

    const handleCompactRows = (padding: "small" | "medium" | "big") => {
        setCompactRows(padding);
    };
    return {
        globalMarketData,
        handleCompactRows,
        compactRows,
        mainCoin,
        loading,
        searchInput,
        setSearchInput,
        filteredCoins,
    };
}
