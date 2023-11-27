import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { ClientProviders } from "@/components/providers";
import type { Metadata } from "next";
import { cn } from "../lib/utils";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

interface RootLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: {
        template: "%s | FinApp",
        default: "FinApp",
    },
    description:
        "An elegant personal finance management website, with the latest technologies.",
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
