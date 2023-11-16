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
                "z-20 sticky top-0 px-4 py-3 bg-background/90 backdrop-filter backdrop-blur-sm shadow-lg border-b border-border",
                rest.className
            )}
        >
            {children}
        </header>
    );
}
