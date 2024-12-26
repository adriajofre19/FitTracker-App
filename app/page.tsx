'use client';
import Login from "@/components/login";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Muestra un indicador de carga o una pantalla vacía mientras se verifica la sesión
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  if (session) {
    // Muestra la página principal si hay sesión
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }

  // Muestra el componente de login si no hay sesión
  return <Login />;
}
