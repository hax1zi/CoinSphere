interface SourceCoinGeckoProps {
    className: string;
}

export default function SourceCoinGecko({ className }: SourceCoinGeckoProps) {
    return (
        <span className={"text-sm absolute " + className}>
            Source:{" "}
            <a className="border-b text-primary border-secondary" href="https://www.coingecko.com/" target="_blank">
                CoinGecko
            </a>
        </span>
    );
}
