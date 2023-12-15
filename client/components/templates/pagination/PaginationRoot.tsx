import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PaginationRootProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function PaginationRoot({ children, ...rest }: PaginationRootProps) {
    return (
        <div
            {...rest}
            className={cn(
                "flex w-full border-2 border-border p-2",
                rest.className
            )}
        >
            {children}
        </div>
    );
}
