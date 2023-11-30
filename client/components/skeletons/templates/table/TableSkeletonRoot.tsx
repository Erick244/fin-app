import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TableSkeletonRootProps extends HTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
}

export function TableSkeletonRoot({
    children,
    ...rest
}: TableSkeletonRootProps) {
    return (
        <table
            {...rest}
            className={cn(
                "table-auto border-collapse border-2 border-border",
                rest.className
            )}
        >
            {children}
        </table>
    );
}
