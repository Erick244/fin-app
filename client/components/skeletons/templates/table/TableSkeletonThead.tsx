import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TableSkeletonTheadProps
    extends HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
}

export function TableSkeletonThead({
    children,
    ...rest
}: TableSkeletonTheadProps) {
    return (
        <thead
            {...rest}
            className={cn("border-b-2 border-border", rest.className)}
        >
            {children}
        </thead>
    );
}
