import { HomePage } from "@/pages/HomePage";
import { Toaster } from "@/shared/ui/sonner";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layouts/MainLayout";
import { setupApiInterceptors } from "./providers/with-api";
import { RegistrationPage } from "@/pages/auth/registration/RegistrationPage";
import { LoginPage } from "@/pages/auth/login/LoginPage";
import { AuthLayout } from "./layouts/AuthLayout";

const authRoutes = [
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
]

const publicRoutes = [
  { path: "/", element: <HomePage /> }
]

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupApiInterceptors(navigate);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route element={<AuthLayout />}>
          {authRoutes.map((route) => (
            <Route key={route.path} path={"/auth" + route.path} element={route.element} />
          ))}
        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Toaster richColors position="top-right" closeButton />
    </>
  );
};