type SupportedCurrency = "btc" | "usd" | "brl";

interface CurrencyPrice {
    btc: number;
    usd: number;
    brl: number;
  };

  interface MarketData {
    current_price: CurrencyPrice;
    market_cap: CurrencyPrice;
    total_volume: CurrencyPrice;
  
    high_24h: CurrencyPrice;
    low_24h: CurrencyPrice;

    max_supply: number
    circulating_supply: number
    total_supply: number
  
    ath: CurrencyPrice;
    ath_change_percentage: CurrencyPrice;
    ath_date: Record<SupportedCurrency, string>;
  
    atl: CurrencyPrice;
    atl_change_percentage: CurrencyPrice;
    atl_date: Record<SupportedCurrency, string>;
  
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1y: number;
  
    market_cap_rank: number;

    fully_diluted_valuation: CurrencyPrice
  }

  export interface CoinDetails {
    id: string;
    symbol: string;
    name: string;
  
    image: {
      thumb: string;
      small: string;
      large: string;
    };
  
    hashing_algorithm: string | null;
    block_time_in_minutes: number;
    genesis_date: string | null;
  
    market_cap_rank: number;
  
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
  
    watchlist_portfolio_users: number;
  
    description: {
      en: string;
    };
  
    links: {
      homepage: string[];
      whitepaper: string | null;
      subreddit_url: string | null;
    };
  
    market_data: MarketData;
  }