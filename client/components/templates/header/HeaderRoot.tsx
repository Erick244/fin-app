import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface HeaderRootProps extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function HeaderRoot({ children, ...rest }: HeaderRootProps) {
    return (
        <header
            {...rest}
            className={cn(
                "px-4 py-3 bg-gradient-to-r dark:from-white/20 dark:via-white/10 dark:to-white/20 from-black/10 via-black/5 to-black/10  backdrop-filter backdrop-blur-sm shadow-lg border border-white/10",
                rest.className
            )}
        >
            {children}
        </header>
    );
}
