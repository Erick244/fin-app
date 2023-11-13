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
                "relative overflow-hidden p-2 border dark:border-white/10 border-black/10 rounded group",
                rest.className
            )}
        >
            <div className="-z-10 top-0 left-0 translate-y-10 group-hover:translate-y-0 dark:bg-white bg-black h-full w-full absolute"></div>
            <span className="z-10 dark:group-hover:text-black group-hover:text-white">
                {children}
            </span>
        </Link>
    );
}
