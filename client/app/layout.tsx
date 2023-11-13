import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { HomeLayout } from "@/components/layouts/HomeLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <HomeLayout>{children}</HomeLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
