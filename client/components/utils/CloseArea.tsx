import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CloseAreaProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export function CloseArea({ children, ...rest }: CloseAreaProps) {
    return (
        <div
            {...rest}
            className={cn(
                "absolute h-full w-full dark:bg-white/10 backdrop-blur-sm bg-black/10 z-10 overflow-hidden",
                rest.className
            )}
        >
            {children}
        </div>
    );
}
