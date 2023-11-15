import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface MenuRootProps extends HTMLAttributes<HTMLMenuElement> {
    children: React.ReactNode;
}

export function MenuRoot({ children, ...rest }: MenuRootProps) {
    return (
        <menu
            {...rest}
            className={cn(
                "p-4 dark:bg-black/30 bg-white/30 shadow shadow-black/30 w-1/2 h-full",
                rest.className
            )}
        >
            {children}
        </menu>
    );
}
