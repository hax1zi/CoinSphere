import Coin from "@/views/Coin";
import { Cryptocurrencies } from "@/views/Cryptocurrencies";
import { Home } from "@/views/Home";
import { Login } from "@/views/Login";
import { Register } from "@/views/Register";

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/criptomoedas",
    element: <Cryptocurrencies />,
  },
  {
    path: "/moeda/:id",
    element: <Coin/>
  },
  {
    path: "/entrar",
    element: <Login />,
  },
  {
    path: "/registrar",
    element: <Register />,
  }
];
