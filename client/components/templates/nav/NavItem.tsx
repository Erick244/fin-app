import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface NavItemProps extends HTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    href: string;
}

export function NavItem({ children, href, ...rest }: NavItemProps) {
    return (
        <Link
            href={href}
            {...rest}
            className={cn(
                "relative overflow-hidden py-2 px-4 sm:py-2 sm:px-2 md:py-2 md:px-4 border dark:border-white/10 border-black/10 rounded group",
                rest.className
            )}
        >
            <div className="z-0 top-0 left-0 -translate-x-full group-hover:translate-x-0 sm:translate-y-10 sm:translate-x-0 sm:group-hover:translate-y-0 bg-foreground h-full w-full absolute transition-all"></div>
            <span className="relative z-10 dark:group-hover:text-black group-hover:text-white">
                {children}
            </span>
        </Link>
    );
}
