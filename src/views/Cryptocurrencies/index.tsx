import { Rows2, Rows3, Rows4, Search } from "lucide-react";
import useCryptocurrencies from "./useCryptocurrencies";
import { formatMoney, formatPercentage } from "@/utils/format";
import SourceCoinGecko from "@/components/SourceCoinGecko";
import PorcentTable from "./components/PocentTable";
import { isMobile } from "@/utils/mobile";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function Cryptocurrencies() {
    const {
        globalMarketData,
        compactRows,
        handleCompactRows,
        mainCoin,
        loading,
        searchInput,
        setSearchInput,
        filteredCoins,
    } = useCryptocurrencies();

    const navigate = useNavigate();

    const toSmallCoinImage = (url: string) => {
        return url.replace("/large/", "/small/");
    };

    const dadosDoMercado = (
        <section
            aria-labelledby="crypto-market-overview-title"
            className={`mt-6 space-y-3 rounded-lg border border-[#383838] bg-background/40 p-4 backdrop-blur-sm ${isMobile === true && "pb-10"}`}
        >
            <SourceCoinGecko className={`${isMobile === false ? "right-4" : "bottom-0 right-6 pt-4"}`} />
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 id="crypto-market-overview-title" className="text-xl font-bold">
                        Visão geral do mercado cripto
                    </h2>
                    <p className="mt-1 text-xs opacity-80 sm:text-sm">
                        Acompanhe rapidamente os principais indicadores do mercado global de criptomoedas.
                    </p>
                </div>
            </div>
            <p className="text-xs opacity-80 sm:text-sm">
                A capitalização global de mercado hoje é de{" "}
                <span className="font-semibold">
                    {formatMoney(globalMarketData?.total_market_cap?.[mainCoin] ?? 0, mainCoin.toUpperCase(), true, 0)}
                </span>
                .
            </p>
            <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row">
                <div className="w-full rounded-lg border p-3">
                    <p className="text-sm opacity-80">Capitalização de mercado</p>
                    <h3 className="mt-1 text-sm font-bold">
                        {formatMoney(
                            globalMarketData?.total_market_cap?.[mainCoin] ?? 0,
                            mainCoin.toUpperCase(),
                            false,
                            0,
                        )}
                    </h3>
                </div>
                <div className="w-full rounded-lg border p-3">
                    <p className="text-sm opacity-80">Volume em 24 h</p>
                    <h3 className="mt-1 text-sm font-bold">
                        {formatMoney(globalMarketData?.total_volume?.[mainCoin] ?? 0, mainCoin.toUpperCase(), false, 0)}
                    </h3>
                </div>
                <div className="w-full rounded-lg border p-3">
                    <p className="text-sm opacity-80">Dominância do Bitcoin</p>
                    <h3 className="mt-1 text-sm font-bold">
                        {formatPercentage(globalMarketData?.market_cap_percentage?.btc ?? 0)}
                    </h3>
                </div>
            </div>
        </section>
    );

    const headPadding =
        compactRows === "small" ? "px-2 py-1.5 text-xs" : compactRows === "medium" ? "px-3 py-2" : "px-4 py-2.5";
    const cellPadding = compactRows === "small" ? "px-2 py-1.5" : compactRows === "medium" ? "px-3 py-2" : "px-4 py-3";
    const rowTextSize = compactRows === "big" ? "text-base" : "text-sm";

    const tabelaDeCriptomoedas = (
        <section
            aria-labelledby="crypto-table-title"
            className="mt-10 w-full rounded-lg bg-[#383838]/20 relative p-4 sm:p-6"
        >
            <SourceCoinGecko className={`${isMobile === false ? "right-6" : "bottom-0 right-6 pt-4"}`} />

            <div className="flex flex-col  ">
                <div>
                    <h3 id="crypto-table-title" className="text-2xl font-bold">
                        Todas as criptomoedas disponíveis
                    </h3>
                    <span className="text-xs opacity-75 sm:text-sm">
                        {filteredCoins.length} {filteredCoins.length === 1 ? "resultado" : "resultados"}
                    </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="relative ">
                        <input
                            className="h-9 rounded-md border border-input bg-background px-3 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            placeholder="Procurar"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Search size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    <div className="flex items-center rounded-full border">
                        <button
                            onClick={() => handleCompactRows("big")}
                            className={`ml-[1px] rounded-full p-[6px] ${
                                compactRows === "big" ? "bg-primary text-background" : ""
                            }`}
                            aria-label="Visualização densa"
                        >
                            <Rows2 size={18} />
                        </button>
                        {isMobile === false && (
                            <button
                                onClick={() => handleCompactRows("medium")}
                                className={`rounded-full p-[6px] ${
                                    compactRows === "medium" ? "bg-primary text-background" : ""
                                }`}
                                aria-label="Visualização média"
                            >
                                <Rows3 size={18} />
                            </button>
                        )}

                        <button
                            onClick={() => handleCompactRows("small")}
                            className={`rounded-full p-[6px] ${
                                compactRows === "small" ? "bg-primary text-background" : ""
                            }`}
                            aria-label="Visualização espaçada"
                        >
                            <Rows4 size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 rounded-lg border border-[#383838] bg-background/40 backdrop-blur-sm">
                <ScrollArea>
                    <table className="min-w-[880px] w-full text-sm">
                        <thead className="sticky top-0 z-30 border-b border-[#383838] bg-background/95">
                            <tr className="text-left">
                                <th aria-hidden="true" className={`w-4 ${headPadding}`} />
                                <th className={"w-10 text-left " + headPadding}>#</th>
                                <th className={`w-[220px] ${headPadding} sticky left-0 z-20 bg-[#080c0f] `}>Nome</th>
                                <th className={headPadding}>Preço</th>
                                <th className={headPadding}>1h</th>
                                <th className={headPadding}>24h</th>
                                <th className={headPadding}>Volume 24h</th>
                                <th className={` ${headPadding}`}>Cap. de Mercado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCoins.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-4 py-10 text-center">
                                        <p className="text-base font-semibold">Nenhuma criptomoeda encontrada</p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Tente outro termo para pesquisa ou limpe o filtro atual.
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="mt-4 border-primary/40"
                                            onClick={() => setSearchInput("")}
                                        >
                                            Limpar busca
                                        </Button>
                                    </td>
                                </tr>
                            ) : (
                                filteredCoins.map((crypto, index) => (
                                    <tr
                                        onClick={() => navigate("/moeda/" + crypto.id)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" || event.key === " ") {
                                                event.preventDefault();
                                                navigate("/moeda/" + crypto.id);
                                            }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Abrir detalhes da moeda ${crypto.name}`}
                                        key={crypto.id}
                                        className={`border-b cursor-pointer hover:bg-background/80 transition-colors border-[#383838]/60 ${rowTextSize}`}
                                    >
                                        <td className={cellPadding} />
                                        <td className={`${cellPadding} font-normal text-muted-foreground`}>{index + 1}</td>
                                        <td className={`${cellPadding} sm:sticky left-0 z-10 bg-[#090e11] `}>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={toSmallCoinImage(crypto.image)}
                                                    alt={crypto.name}
                                                    className="h-6 w-6 rounded-full object-cover"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <div
                                                    className={`flex ${
                                                        compactRows === "big" ? "flex-col " : "flex-row gap-1"
                                                    } ${compactRows === "small" && "items-center"}`}
                                                >
                                                    <span className="font-medium">{crypto.name}</span>
                                                    <span className="text-[0.65rem] uppercase text-muted-foreground">
                                                        {crypto.symbol}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={cellPadding}>
                                            {formatMoney(crypto.current_price ?? 0, mainCoin.toUpperCase(), false, 2)}
                                        </td>
                                        <td className={cellPadding + " min-w-24"}>
                                            <PorcentTable
                                                compactRows={compactRows}
                                                porcent={crypto.price_change_percentage_1h_in_currency}
                                            />
                                        </td>
                                        <td className={cellPadding + " max-w-[96px]"}>
                                            <PorcentTable
                                                compactRows={compactRows}
                                                porcent={crypto.price_change_percentage_24h}
                                            />
                                        </td>
                                        <td className={cellPadding}>
                                            {formatMoney(crypto.total_volume ?? 0, mainCoin.toUpperCase(), false, 2)}
                                        </td>
                                        <td className={cellPadding}>
                                            {formatMoney(crypto.market_cap ?? 0, mainCoin.toUpperCase(), false, 2)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </section>
    );

    return (
        <>
            <LoadingOverlay isLoading={loading} message="Carregando criptomoedas..." />
            <div className="space-y-4">
                {dadosDoMercado}
                {tabelaDeCriptomoedas}
            </div>
        </>
    );
}
