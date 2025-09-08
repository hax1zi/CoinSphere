import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bolt } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  const Navbar = () => {
    return (
      <div className="relative">
        <nav className="space-x-4 py-2">
          <Link
            className={cn(
              "hover:text-primary transition-colors",
              location.pathname === "/" && "border-b-4 border-primary pb-2"
            )}
            to="/"
          >
            Inicio
          </Link>
          <Link
            className={cn(
              "hover:text-primary transition-colors",
              location.pathname === "/criptomoedas" &&
                "border-b-4 border-primary pb-2"
            )}
            to="/criptomoedas"
          >
            Criptomoedas
          </Link>
          <Link
            className={cn(
              "hover:text-primary transition-colors",
              location.pathname === "/converter" &&
                "border-b-4 border-primary pb-2"
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
      <header className="px-[10vw] py-4 border-b-2 dark:text-white text-black flex justify-between items-center">
        <div className="inline-flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          <h1 className="font-bold text-2xl">CoinSphere</h1>
        </div>
        <Navbar />
        <div className="inline-flex items-center gap-2">
          <Button variant="ghost">
            <Bolt />
          </Button>
          <Button variant="ghost">Entrar</Button>
          <Button className="font-semibold">Abrir Minha Conta</Button>
        </div>
      </header>
    );
  };

  return (
    <div className="dark bg-background w-screen h-screen manrope ">
      <Header />
      <main  className="dark:text-white text-black h-[calc(100vh-74px)] px-[10vw] overflow-auto ">
        <Outlet />
      </main>
    </div>
  );
}
