import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

export function FinAppLogo(props: HTMLAttributes<HTMLAnchorElement>) {
    return (
        <Link
            href={"/"}
            {...props}
            className={cn("flex gap-2 select-none", props.className)}
        >
            <span className="bg-foreground text-4xl dark:text-black text-white p-1 rounded">
                Fin
            </span>
            <span className="font-light self-end text-2xl">App</span>
        </Link>
    );
}
