import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ExternalLink, Info, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useCoin from "./useCoin";
import { formatMoney, formatNumber } from "@/utils/format";
import PorcentTable from "../Cryptocurrencies/components/PocentTable";
import SourceCoinGecko from "@/components/SourceCoinGecko";
import Chart from "./components/Chart";

export default function Coin() {
    const { id } = useParams();
    const { coinData, mainValuesArray, mainCoin } = useCoin({ coinId: id });

    if (!coinData) {
        return (
            <section className="flex h-full items-center justify-center">
                <div className="text-center text-sm text-muted-foreground">Carregando dados da moeda...</div>
            </section>
        );
    }

    const homepage = coinData.links.homepage?.[0];

    const cleanDescription = coinData.description.en
        ?.replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const shortDescription =
        cleanDescription && cleanDescription.length > 420
            ? `${cleanDescription.slice(0, 420).trimEnd()}...`
            : cleanDescription;

    return (
        <section className="space-y-6 relative">
            <div className="flex items-center justify-between gap-4">
                <Link to={"/criptomoedas"}>
                    <Button variant="outline" className="font-semibold uppercase">
                        <ChevronLeftIcon size={18} className="mr-1" />
                        Voltar
                    </Button>
                </Link>
                <div>
                    {homepage && (
                        <a href={homepage} target="_blank" rel="noreferrer" className="mt-10">
                            <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm">
                                Site oficial
                                <ExternalLink size={14} />
                            </Button>
                        </a>
                    )}
                </div>
            </div>
            <SourceCoinGecko className="top-8 right-3" />
            <div className="flex flex-col gap-6 rounded-xl border border-[#383838] bg-background/40 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
                        <img src={coinData.image.large} alt={coinData.name} className="relative z-10 h-16 w-16" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold sm:text-3xl">{coinData.name}</h1>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold uppercase text-muted-foreground">
                                {coinData.symbol}
                            </span>
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                                <Sparkles size={14} /> Rank #{coinData.market_cap_rank}
                            </span>
                            {coinData.genesis_date && (
                                <span className="hidden sm:inline-flex items-center gap-1">
                                    <Info size={14} />
                                    Desde {new Date(coinData.genesis_date).getFullYear()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-1 text-right sm:min-w-[220px]">
                    <p className="text-xs uppercase text-muted-foreground">Preço atual</p>
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-2xl font-semibold sm:text-3xl">
                            {formatMoney(coinData.market_data.current_price?.[mainCoin] ?? 0, mainCoin.toLowerCase(), false, 2)}
                        </span>
                        <PorcentTable
                            porcent={coinData.market_data.price_change_percentage_30d ?? 0}
                            compactRows="small"
                        />
                        <span className="text-xs font-medium text-muted-foreground -ml-2 -mt-2">1M</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Máx 24h:{" "}
                        <span className="font-medium">
                            {formatMoney(coinData.market_data.high_24h?.[mainCoin] ?? 0, mainCoin.toLowerCase(), false, 2)}
                        </span>{" "}
                        · Mín 24h:{" "}
                        <span className="font-medium">
                            {formatMoney(coinData.market_data.low_24h?.[mainCoin] ?? 0, mainCoin.toLowerCase(), false, 2)}
                        </span>
                    </p>
                </div>
            </div>
            <Chart id={coinData?.id} />
            <div className="grid gap-4 md:grid-cols-[2fr,1.4fr]">
                <div className="space-y-4 rounded-xl border border-[#383838] bg-background/40 p-4 sm:p-5">
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide ">Visão geral do mercado</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {mainValuesArray.map((cell) => (
                            <div
                                key={cell.label}
                                className="rounded-lg border border-[#383838]/70 bg-background/40 p-3 text-sm"
                            >
                                <p className="text-[0.7rem] font-medium uppercase text-muted-foreground">
                                    {cell.label}
                                </p>
                                <p className="mt-1 text-sm font-semibold">
                                    {cell.type === "amount"
                                        ? formatMoney(cell.value ?? 0, mainCoin.toLowerCase(), false, 0)
                                        : formatNumber(cell.value ?? 0)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 rounded-xl border border-[#383838] bg-background/40 p-4 sm:p-5">
                    <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide ">Sobre {coinData.name}</h2>
                    {shortDescription ? (
                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{shortDescription}</p>
                    ) : (
                        <p className="text-xs text-muted-foreground">Sem descrição disponível para esta moeda.</p>
                    )}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs ">
                        <div>
                            <p className="font-medium text-[0.7rem] uppercase">Algoritmo</p>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                {coinData.hashing_algorithm ? coinData.hashing_algorithm : "—"}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium text-[0.7rem] uppercase">Tempo de bloco</p>
                            <p className="mt-0.5 text-sm text-muted-foreground">{coinData.block_time_in_minutes} min</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
