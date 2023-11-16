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
                "p-4 bg-background shadow shadow-black/30 w-1/2 h-full z-10",
                rest.className
            )}
        >
            {children}
        </menu>
    );
}
