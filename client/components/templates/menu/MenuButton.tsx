import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface MenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
    menuIsOpen: boolean;
}

export function MenuButton({ menuIsOpen, ...rest }: MenuButtonProps) {
    return (
        <button
            {...rest}
            className={cn(
                "px-1 py-2  flex flex-col gap-1 transition-all",
                rest.className
            )}
        >
            <div
                className={cn(
                    "dark:bg-white bg-black h-0.5 w-6 transition-all",
                    menuIsOpen
                        ? "-rotate-45 translate-y-1 -translate-x-0.5"
                        : "-rotate-0 translate-y-0 -translate-x-0"
                )}
            ></div>

            <div
                className={cn(
                    "dark:bg-white bg-black h-0.5 w-6 transition-all delay-100",
                    menuIsOpen
                        ? "rotate-45 -translate-y-0.5 -translate-x-0.5"
                        : "-rotate-0 translate-y-0 -translate-x-0"
                )}
            ></div>

            <div
                className={cn(
                    "dark:bg-white bg-black h-0.5",
                    menuIsOpen ? "w-0" : "w-6"
                )}
            ></div>
        </button>
    );
}
