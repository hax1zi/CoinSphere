import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Rows2, Rows3, Rows4, Search } from "lucide-react";
import useCryptocurrencies from "./useCryptocurrencies";
import { formatMoney, formatPercentage } from "@/utils/format";

export function Cryptocurrencies() {
    const { cryptocoins, globalMarketData } = useCryptocurrencies();

    console.log(globalMarketData);

    const DadosDoMercado = () => {
        return (
            <div>
                <div className="inline-flex mt-6 items-center gap-2 py-1 px-4 border-x border-t rounded-t-lg border-[#383838]">
                    <label className="text-sm font-bold">Mostrar</label>
                    <Switch />
                </div>
                <div className="border w-full p-4 text-center flex items-center flex-col border-[#383838] rounded-r-lg rounded-b-lg">
                    <h2 className=" text-xl font-bold">Preços da criptomoeda por capitalização de mercado</h2>
                    <p className="text-sm max-w-[400px] opacity-80 mt-2">
                        A capitalização global de mercado para criptomoedas no dia de hoje é de{" "}
                        {formatMoney(globalMarketData?.total_market_cap?.usd ?? 0, "USD", true)}.
                    </p>
                    <div className="flex gap-3 mt-4 max-md:flex-col max-md:gap-2 max-md:w-full ">
                        <Card className="bg-background max-md:h-[76px] max-md:p-3 w-[190px] max-md:w-full border-primary rounded-lg">
                            <CardContent className="text-left px-3 max-md:text-center ">
                                <label className="text-sm opacity-80">Capitalização de mercado</label>
                                <h3 className="font-bold text-sm">
                                    {formatMoney(globalMarketData?.total_market_cap?.usd ?? 0, "USD", false)}
                                </h3>
                            </CardContent>
                        </Card>
                        <Card className="bg-background w-[190px] max-md:w-full relative border-primary rounded-lg  max-md:h-[76px] max-md:p-3">
                            <CardContent className="text-left px-3  max-md:text-center">
                                <label className="text-sm opacity-80">Volume em 24 h</label>
                                <h3 className="font-bold text-sm">
                                    {formatMoney(globalMarketData?.total_volume?.usd ?? 0, "USD", false)}
                                </h3>
                            </CardContent>
                        </Card>
                        <Card className="bg-background  w-[190px] relative border-primary rounded-lg  max-md:h-[76px] max-md:p-3 max-md:w-full">
                            <CardContent className="text-left px-3 max-md:text-center">
                                <label className="text-sm opacity-80">Dominância do Bitcoin</label>
                                <h3 className="font-bold text-sm">
                                    {formatPercentage(globalMarketData?.market_cap_percentage?.btc ?? 0)}
                                </h3>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    };

    const TabelaDeCriptomoedas = () => {
        return (
            <div className="bg-[#383838]/20 w-full mt-16 p-6 rounded-lg">
                <h3 className="text-2xl font-bold">Todas as criptomoedas disponiveis</h3>
                <span>Website em desenvolvimento</span>
                <div className="mt-4 flex justify-between">
                    <div className="relative inline-block">
                        <input className="border rounded-md px-2 py-1" placeholder="Procurar" />
                        <Search size={18} className="absolute top-2 right-2" />
                    </div>
                    <div className="border rounded-full flex items-center ">
                        <button className="bg-primary rounded-full p-[6px] ml-[1px]">
                            <Rows2 size={18} />
                        </button>
                        <button className="rounded-full p-[6px]">
                            <Rows3 size={18} />
                        </button>
                        <button className="rounded-full p-[6px]">
                            <Rows4 size={18} />
                        </button>
                    </div>
                </div>
                <table className="w-full mt-4 border-y ">
                    <thead className="border-b border-[#383838]">
                        <tr className="text-left  text-sm">
                            <th colSpan={1} className="w-10 p-2"></th>
                            <th className="p-2 text-left">#</th>
                            <th className="p-2 w-[20vw]">Nome</th>
                            <th className="p-2">Preço</th>
                            <th className="p-2">1h</th>
                            <th className="p-2">24h</th>
                            <th className="p-2">7d</th>
                            <th className="p-2">Volume/24h</th>
                            <th className="p-2 w-[20vw]">Capitalização de mercado</th>
                            <th className="p-2">Último 7 dias</th>
                        </tr>
                    </thead>
                    {cryptocoins.map((crypto, index) => (
                        <tbody key={crypto.id}>
                            <tr className="border-b ">
                                <th className="py-6"></th>
                                <th className="font-normal text-left text-xs">{index + 1}</th>
                                <th className="flex items-center pt-3 gap-2">
                                    <img src={crypto.image} className="w-6" />{" "}
                                    <h4 className="text-left text-sm">{crypto.name}</h4>
                                </th>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        );
    };

    return (
        <div>
            <DadosDoMercado />
            <TabelaDeCriptomoedas />
        </div>
    );
}
