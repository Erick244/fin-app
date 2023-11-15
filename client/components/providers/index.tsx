import { JotaiProvider } from "./JotaiProvider";
import { ThemeProvider } from "./ThemeProvider";

interface ClientProvidersProps {
    children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <JotaiProvider>{children}</JotaiProvider>
        </ThemeProvider>
    );
}
