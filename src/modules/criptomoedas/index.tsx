import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function Criptomoedas() {
    const DadosDoMercado = () => {
        return (
            <div>
                <div className="inline-flex mt-6 items-center gap-2 py-1 px-4 border-x border-t rounded-t-lg border-[#383838]">
                    <label className="text-sm font-bold">Mostrar</label>
                    <Switch />
                </div>
                <div className="border w-full text-center flex items-center flex-col border-[#383838] rounded-r-lg rounded-b-lg">
                    <h2 className="mt-4 text-2xl font-bold">
                        Preços da criptomoeda por capitalização de mercado
                    </h2>
                    <p className="text-sm max-w-[500px] opacity-80 mt-2">
                        A capitalização global de mercado para criptomoedas no
                        dia de hoje é de $4 biliões, uma diferença de 1.4% nas
                        últimas 24 horas.
                    </p>
                    <div className="inline-flex gap-4 mt-8 mb-4">
                        <Card className="bg-[#62D361]/10  border-[#449346] rounded-lg">
                            <CardContent className="text-left min-w-[248px]">
                                <label className="text-sm opacity-80">
                                    Capitalização de mercado
                                </label>
                                <h3 className="font-bold">
                                    US$ 3.944.574.504.114
                                </h3>
                                <div className="bg-[#62D361]/30 p-1 max-w-15 mt-1 text-[#62D361] font-bold rounded-sm border border-[#62D361]/50 text-sm text-center">
                                    ^1.7%
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#A60320]/10  border-[#5E0418] rounded-lg">
                            <CardContent className="text-left min-w-[248px]">
                                <label className="text-sm opacity-80">
                                    Volume em 24 h
                                </label>
                                <h3 className="font-bold">
                                    US$ 144.165.583.276
                                </h3>
                                <div className="bg-[#A60320]/15 p-1 max-w-15  mt-1 text-[#A60320] font-bold rounded-sm border border-[#A60320]/50 text-sm text-center">
                                    ^1.7%
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#A60320]/10  border-[#5E0418] rounded-lg">
                            <CardContent className="text-left min-w-[248px]">
                                <label className="text-sm opacity-80">
                                    Dominância do Bitcoin
                                </label>
                                <h3 className="font-bold">55.1%</h3>
                                <div className="bg-[#A60320]/15 p-1 max-w-15  mt-1 text-[#A60320] font-bold rounded-sm border border-[#A60320]/50 text-sm text-center">
                                    ^1.7%
                                </div>
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
            </div>
        )
    }

    return (
        <div>
            <DadosDoMercado />
            <TabelaDeCriptomoedas />
        </div>
    );
}
