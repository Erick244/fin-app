"use client";

import VerifyCodeContextProvider from "@/contexts/auth/VerifyCodeContext";

interface VerifyCodeProviderProps {
    children: React.ReactNode;
}

export function VerifyCodeProvider({ children }: VerifyCodeProviderProps) {
    return <VerifyCodeContextProvider>{children}</VerifyCodeContextProvider>;
}
