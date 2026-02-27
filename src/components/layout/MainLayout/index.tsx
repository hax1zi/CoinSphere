import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobileMenuActive } from "@/store/useMobileMenuActive";
import { Bolt, Menu, X } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
    const location = useLocation();
    const { toggleActive, isActive, desactivate } = useMobileMenuActive();

    const Navbar = () => {
        return (
            <nav
                aria-label="Navegação principal"
                className="relative flex items-center gap-4 py-2 max-md:flex-col max-md:items-center max-md:gap-2"
            >
                <Link
                    onClick={desactivate}
                    className={cn(
                        "hover:text-primary transition-colors",
                        location.pathname === "/" && "border-b-4 border-primary",
                    )}
                    to="/"
                >
                    Inicio
                </Link>
                <Link
                    onClick={desactivate}
                    className={cn(
                        "hover:text-primary transition-colors",
                        location.pathname === "/criptomoedas" && "border-b-4 border-primary",
                    )}
                    to="/criptomoedas"
                >
                    Criptomoedas
                </Link>
                {/* <Link
                    onClick={desactivate}
                    className={cn(
                        "hover:text-primary transition-colors",
                        location.pathname === "/converter" && "border-b-4 border-primar",
                    )}
                    to="/converter"
                >
                    Converter
                </Link> */}
            </nav>
        );
    };
    const Header = () => {
        return (
            <header className="z-20 border-b-2 px-4 py-4 text-black dark:text-white sm:px-6 lg:px-[10vw]">
                <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2">
                        <img src="/logo.svg" alt="Logo CoinSphere" className="h-8 w-auto" />
                        <h1 className="text-xl font-bold sm:text-2xl lg:block">CoinSphere</h1>
                    </div>
                    <div className="hidden items-center gap-6 md:flex">
                        <Navbar />
                        <div className="inline-flex items-center gap-1">
                            <Button variant="ghost" size="icon" aria-label="Atalhos rápidos">
                                <Bolt />
                            </Button>
                            <Button variant="ghost">Entrar</Button>
                            <Button className="font-semibold">Abrir minha conta</Button>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <Button
                            onClick={() => toggleActive()}
                            variant="ghost"
                            aria-label="Abrir menu"
                            className={cn(isActive && "invisible")}
                        >
                            <Menu />
                        </Button>
                    </div>
                </div>
            </header>
        );
    };

    return (
        <div className="manrope dark bg-background min-h-screen w-full">
            <Header />
            <main className="relative min-h-[calc(100vh-80px)] overflow-auto px-4 py-6 text-black dark:text-white sm:px-6 lg:px-[10vw]">
                <div
                    className={cn(
                        "fixed inset-0 z-30 flex items-center justify-center bg-background/95 px-6 transition-opacity md:hidden",
                        isActive ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="absolute right-4 top-4">
                        <Button onClick={desactivate} variant="ghost" aria-label="Fechar menu">
                            <X />
                        </Button>
                    </div>
                    <div className="pt-16 text-center">
                        <Navbar />
                        <div className="mt-4 flex flex-col items-center justify-center gap-2">
                            <Button variant="ghost">
                                <Bolt />
                            </Button>
                            <Button onClick={desactivate} variant="ghost">
                                Entrar
                            </Button>
                            <Button onClick={desactivate} className="font-semibold">
                                Abrir minha conta
                            </Button>
                        </div>
                    </div>
                </div>
                <Outlet />
            </main>
        </div>
    );
}
