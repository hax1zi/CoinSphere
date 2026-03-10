import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <main className="flex min-h-[calc(100vh-130px)] w-full">
            <section
                aria-labelledby="home-hero-title"
                className="relative flex w-full items-center justify-between gap-10 overflow-hidden rounded-2xl  bg-background/35 px-4 py-8 backdrop-blur-sm sm:px-8 md:min-h-[72vh]"
            >
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 14% 18%, rgba(242,174,49,0.12) 0, transparent 32%), radial-gradient(circle at 86% 78%, rgba(242,116,5,0.1) 0, transparent 34%), radial-gradient(1.5px 1.5px at 18% 26%, rgba(255,255,255,0.35) 0, transparent 100%), radial-gradient(1.5px 1.5px at 42% 68%, rgba(255,255,255,0.28) 0, transparent 100%), radial-gradient(1.5px 1.5px at 72% 34%, rgba(255,255,255,0.3) 0, transparent 100%), radial-gradient(1.5px 1.5px at 90% 18%, rgba(255,255,255,0.25) 0, transparent 100%)",
                        }}
                    />
                </div>

                <div className="max-w-xl text-center md:text-left z-10">
                    <h2
                        id="home-hero-title"
                        className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                    >
                        Bem-vindo ao{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            CoinSphere
                        </span>
                    </h2>
                    <p className="text-lg font-semibold sm:text-xl">Acompanhe. Analise. Supere o mercado.</p>
                    <div className="mt-4 mb-4 h-1 w-32 rounded-full bg-secondary/80 max-md:w-full" />
                    <p className="mx-auto max-w-[600px] text-sm opacity-90 sm:text-base">
                        Seu universo cripto em um só lugar. Acompanhe suas moedas, descubra tendências e veja seu
                        portfólio ganhar vida em tempo real. Do Bitcoin às novas gemas, o CoinSphere coloca você no
                        centro da galáxia cripto.
                    </p>
                    <div className="mt-6 flex flex-row items-center gap-3 max-md:justify-center">
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

                <div className="relative z-10 hidden md:block">
                    <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
                    <div className="animate-[spin_16s_linear_infinite]">
                        <img src="/mainsCripto.png" alt="Principais criptomoedas em destaque" />
                    </div>
                    <img
                        className="absolute left-1/2 top-1/2 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/60  shadow-lg"
                        src="/logo.svg"
                        alt="Logo CoinSphere"
                    />
                </div>

                <div className="absolute bottom-0 right-0 z-10 flex rounded-lg p-2 px-3">
                    <a href="https://www.coingecko.com/" target="_blank" className="flex items-center gap-1">
                        Data powered by
                        <img src="/CGAPI-Lockup@2x-1.png" alt="coinGeckoApi" className="w-40" />
                    </a>
                </div>
            </section>
        </main>
    );
}
