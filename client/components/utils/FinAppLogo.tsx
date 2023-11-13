import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function FinAppLogo(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn("flex gap-2 select-none", props.className)}
        >
            <span className="dark:bg-white text-4xl bg-black dark:text-black text-white p-1 rounded">
                Fin
            </span>
            <span className="font-light self-end text-2xl">App</span>
        </div>
    );
}
