import { Criptomoedas } from "@/modules/criptomoedas";
import { Inicio } from "../modules/inicio";

export const publicRoutes = [
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/criptomoedas",
    element: <Criptomoedas />,
  },
];
