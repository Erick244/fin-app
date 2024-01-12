import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface FinAppLogoProps extends HTMLAttributes<HTMLAnchorElement> {
    size?: "MD" | "LG" | "XL";
}

const sizeClasses = {
    MD: ["text-4xl", "text-2xl"],
    LG: ["text-6xl", "text-4xl"],
    XL: ["text-8xl", "text-6xl"],
};

export function FinAppLogo({ size, ...rest }: FinAppLogoProps) {
    return (
        <Link
            href={"/#introduction"}
            {...rest}
            className={cn("flex gap-2 select-none", rest.className)}
        >
            <span
                className={cn(
                    "bg-foreground dark:text-black text-white p-1 rounded",
                    sizeClasses[size || "MD"][0]
                )}
            >
                Fin
            </span>
            <span
                className={cn(
                    "font-light self-end",
                    sizeClasses[size || "MD"][1]
                )}
            >
                App
            </span>
        </Link>
    );
}
