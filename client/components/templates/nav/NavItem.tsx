import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface NavItemProps extends HTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    href: string;
    active?: boolean;
}

export function NavItem({ children, href, active, ...rest }: NavItemProps) {
    return (
        <Link
            href={href}
            {...rest}
            className={cn(
                "relative overflow-hidden py-2 px-4 sm:py-2 sm:px-2 md:py-2 md:px-4 border border-foreground/30 rounded group ",
                rest.className
            )}
        >
            <div
                className={cn(
                    "z-0 top-0 left-0 -translate-x-full sm:translate-y-10 sm:translate-x-0 bg-foreground h-full w-full absolute  transition-all duration-150",
                    active
                        ? "translate-x-0 sm:translate-y-0"
                        : "group-hover:translate-x-0 sm:group-hover:translate-y-0"
                )}
            ></div>
            <span
                className={cn(
                    "relative z-10 transition-all duration-150",
                    active ? "text-background" : "group-hover:text-background"
                )}
            >
                {children}
            </span>
        </Link>
    );
}
