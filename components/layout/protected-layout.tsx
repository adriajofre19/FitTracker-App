'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { status } = useSession()

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/login")
        }
    }, [status])

    // Mientras se verifica la sesión, mostramos un estado de carga
    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    // Si está autenticado, mostramos el contenido
    return <>{children}</>
}
