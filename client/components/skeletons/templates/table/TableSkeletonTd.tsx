import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TableSkeletonTdProps extends HTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
}

export function TableSkeletonTd({ children, ...rest }: TableSkeletonTdProps) {
    return (
        <td {...rest} className={cn("text-center p-4", rest.className)}>
            {children}
        </td>
    );
}
