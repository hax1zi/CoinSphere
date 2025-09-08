import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "./Public";
import MainLayout from "@/components/layout/MainLayout";

export function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: publicRoutes,
    },
  ]);

  return <RouterProvider router={router} />;
}
