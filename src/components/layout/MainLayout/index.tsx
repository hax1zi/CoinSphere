import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobileMenuActive } from "@/store/useMobileMenuActive";
import { Bolt, Menu } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
    const location = useLocation();
    const { toggleActive, isActive, desactivate } = useMobileMenuActive();

    const Navbar = () => {
        return (
            <div className="relative">
                <nav className="space-x-4 py-2 max-md:flex max-md:flex-col max-md:items-center max-md:space-x-0 max-md:space-y-2 items-center text-lg font-medium ">
                    <Link
                        onClick={desactivate}
                        className={cn(
                            "hover:text-primary transition-colors",
                            location.pathname === "/" && "border-b-4 border-primary pb-2",
                        )}
                        to="/"
                    >
                        Inicio
                    </Link>
                    <Link
                        onClick={desactivate}
                        className={cn(
                            "hover:text-primary transition-colors",
                            location.pathname === "/criptomoedas" && "border-b-4 border-primary pb-2",
                        )}
                        to="/criptomoedas"
                    >
                        Criptomoedas
                    </Link>
                    <Link
                        onClick={desactivate}
                        className={cn(
                            "hover:text-primary transition-colors",
                            location.pathname === "/converter" && "border-b-4 border-primary pb-2",
                        )}
                        to="/converter"
                    >
                        Converter
                    </Link>
                </nav>
            </div>
        );
    };
    const Header = () => {
        return (
            <header className="px-[10vw] z-20 py-4 border-b-2 dark:text-white text-black flex justify-between items-center">
                <div className="inline-flex items-center gap-2">
                    <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
                    <h1 className="font-bold text-2xl max-lg:hidden">CoinSphere</h1>
                </div>
                <div className="max-md:hidden flex gap-4">
                    <Navbar />
                    <div className="inline-flex items-center gap-1 ">
                        <Button variant="ghost">
                            <Bolt />
                        </Button>
                        <Button variant="ghost">Entrar</Button>
                        <Button className="font-semibold">Abrir Minha Conta</Button>
                    </div>
                </div>
                <div>
                    <Button onClick={() => toggleActive()} variant="ghost" className="max-md:inline-flex hidden">
                        <Menu />
                    </Button>
                </div>
            </header>
        );
    };

    return (
        <div className="dark bg-background w-screen h-screen manrope ">
            <Header />
            <main
                className={`dark:text-white text-black h-[calc(100vh-80px)] px-[10vw]  ${isActive ? "overflow-hidden" : "overflow-auto"}`}
            >
                <div
                    className={`h-[${isActive ? "calc(100vh-70px)" : "0px"}]  w-full top-[70px] left-0 z-10 transition-transform duration-300 ${isActive ? "translate-y-0" : "-translate-y-200"}`}
                >
                    <div className="pt-20 ">
                        <Navbar />
                        <div className="flex items-center flex-col justify-center gap-1 ">
                            <Button variant="ghost">
                                <Bolt />
                            </Button>
                            <Button onClick={desactivate} variant="ghost">
                                Entrar
                            </Button>
                            <Button onClick={desactivate} className="font-semibold">
                                Abrir Minha Conta
                            </Button>
                        </div>
                    </div>
                </div>
                <Outlet />
            </main>
        </div>
    );
}
