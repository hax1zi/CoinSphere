export interface CryptocoinType {
    id: string;
    symbol: string;
    name: string;
    image: string;

    total_volume: number;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;

    high_24h: number;
    low_24h: number;

    price_change_24h: number;
    price_change_percentage_24h: number;

    price_change_percentage_1h_in_currency: number

    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;

    circulating_supply: number;
    total_supply: number;
    max_supply: number | null;

    ath: number;
    ath_change_percentage: number;
    ath_date: string;

    atl: number;
    atl_change_percentage: number;
    atl_date: string;

    roi: {
        times: number;
        currency: string;
        percentage: number;
    } | null;

    last_updated: string;
}

interface MarketOptions {
    usd: number;
    btc: number;
}

export interface GlobalMarketDataType {
    total_market_cap: MarketOptions;
    total_volume: MarketOptions;
    market_cap_percentage: MarketOptions;
}
