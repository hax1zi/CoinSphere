import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <main className="flex h-[calc(100vh-130px)] w-full ">
            <section
                aria-labelledby="home-hero-title"
                className="flex w-full relative h-full gap-10 justify-between items-center overflow-hidden "
            >
                <div className="max-w-xl text-center md:text-left">
                    <h2
                        id="home-hero-title"
                        className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                    >
                        Bem-vindo ao{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            CoinSphere
                        </span>
                    </h2>
                    <p className="text-lg font-semibold sm:text-xl">Rastreador de Portfólio de Criptomoedas</p>
                    <div className="mt-4 mb-4 h-1 w-32 rounded-full bg-secondary/80 max-md:w-full" />
                    <p className="mx-auto max-w-[600px] text-sm opacity-90 sm:text-base">
                        Seu universo cripto em um só lugar. Acompanhe suas moedas, descubra tendências e veja seu
                        portfólio ganhar vida em tempo real. Do Bitcoin às novas gemas, o CoinSphere coloca você no
                        centro da galáxia cripto.
                    </p>
                    <div className="mt-4 flex items-center gap-3 flex-row  max-md:justify-center">
                        <Button size="lg" className=" sm:w-auto">
                            Começar agora
                        </Button>

                        <Link to="/criptomoedas">
                            <Button variant="outline" size="lg" className="w-full border-primary/40 sm:w-auto">
                                Ver criptomoedas
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="relative hidden  md:block">
                    <div className="animate-[spin_8s_linear_infinite]">
                        <img src="/mainsCripto.png" alt="Principais criptomoedas em destaque" />
                    </div>
                    <img
                        className="absolute left-1/2 top-1/2 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/60  shadow-lg"
                        src="/logo.svg"
                        alt="Logo CoinSphere"
                    />
                </div>
                <div className="absolute bottom-0 right-0  flex  p-2 px-3 rounded-lg">
                    <a href="https://www.coingecko.com/" target="_blank" className="flex items-center gap-1">
                        Data powered by
                        <img src="/CGAPI-Lockup@2x-1.png" className="w-40" />
                    </a>
                </div>
            </section>
        </main>
    );
}
