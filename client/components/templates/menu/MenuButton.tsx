"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";

export function MenuButton(props: HTMLAttributes<HTMLButtonElement>) {
    const [isClosed, setIsClosed] = useState<boolean>(true);

    function onClick() {
        setIsClosed(!isClosed);
    }

    return (
        <button
            {...props}
            className={cn(
                "px-1 py-2  flex flex-col gap-1 transition delay-300",
                props.className
            )}
            onClick={onClick}
        >
            <div
                className={cn(
                    "dark:bg-white bg-black h-0.5 w-6 delay-200",
                    isClosed
                        ? "-rotate-0 translate-y-0 -translate-x-0"
                        : "-rotate-45 translate-y-1 -translate-x-0.5"
                )}
            ></div>

            <div
                className={cn(
                    "dark:bg-white bg-black h-0.5 w-6",
                    isClosed
                        ? "-rotate-0 translate-y-0 -translate-x-0"
                        : "rotate-45 -translate-y-0.5 -translate-x-0.5"
                )}
            ></div>
            {isClosed && (
                <div className="dark:bg-white bg-black h-0.5 w-6 delay-200"></div>
            )}
        </button>
    );
}
