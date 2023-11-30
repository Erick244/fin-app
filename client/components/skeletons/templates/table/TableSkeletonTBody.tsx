import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TableSkeletonTBodyProps
    extends HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
}

export function TableSkeletonTBody({
    children,
    ...rest
}: TableSkeletonTBodyProps) {
    return (
        <tbody {...rest} className={cn("", rest.className)}>
            {children}
        </tbody>
    );
}
