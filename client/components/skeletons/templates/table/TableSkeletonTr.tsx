import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TableSkeletonTrProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export function TableSkeletonTr({ children, ...rest }: TableSkeletonTrProps) {
    return (
        <tr
            {...rest}
            className={cn(
                "text-center p-4 border-b border-border",
                rest.className
            )}
        >
            {children}
        </tr>
    );
}
