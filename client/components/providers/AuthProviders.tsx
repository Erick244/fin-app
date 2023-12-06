"use client";

import AuthContextProvider from "@/contexts/auth/AuthContext";

interface AuthProvidersProps {
    children: React.ReactNode;
}

export function AuthProviders({ children }: AuthProvidersProps) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
}
