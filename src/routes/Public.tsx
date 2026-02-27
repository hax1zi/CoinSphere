import Coin from "@/views/Coin";
import { Cryptocurrencies } from "@/views/Cryptocurrencies";
import { Home } from "@/views/Home";

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
  }
];
