import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function DiagonalSeparator(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                "w-0 h-0 border-r-[100vw] border-b-[13.9vw] border-r-transparent border-b-foreground",
                props.className
            )}
        />
    );
}
