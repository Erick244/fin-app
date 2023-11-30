import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function TableSkeletonTh(props: HTMLAttributes<HTMLElement>) {
    return (
        <th {...props} className={cn("p-4", props.className)}>
            <Skeleton className="h-3 w-16" />
        </th>
    );
}
