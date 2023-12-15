import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface PaginationPageNumberProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    pageIndex: number;
    current?: boolean;
}

export function PaginationPageNumber({
    pageIndex,
    current,
    href,
    ...rest
}: PaginationPageNumberProps) {
    return (
        <Link
            {...rest}
            className={cn(
                "text-xs px-3 py-2 rounded border border-input",
                current
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
                rest.className
            )}
            href={href}
        >
            {pageIndex}
        </Link>
    );
}
