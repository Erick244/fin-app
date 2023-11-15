import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { HomeLayout } from "@/components/layouts/HomeLayout";
import { ClientProviders } from "@/components/providers";
import { cn } from "../lib/utils";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

interface RootLayoutProps {
    children: React.ReactNode;
}

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
                <ClientProviders>
                    <HomeLayout>{children}</HomeLayout>
                </ClientProviders>
            </body>
        </html>
    );
}
