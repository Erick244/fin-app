import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface PaginationPageSwitchProps extends HTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    href: string;
}

export function PaginationPageSwitch({
    children,
    href,
    ...rest
}: PaginationPageSwitchProps) {
    return (
        <Link
            {...rest}
            href={href}
            className={cn(
                "flex justify-center items-center px-3 py-2 hover:bg-secondary rounded",
                rest.className
            )}
        >
            {children}
        </Link>
    );
}
