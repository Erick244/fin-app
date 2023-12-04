"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart4 } from "lucide-react";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

interface GettingStartedButtonProps
    extends HTMLAttributes<HTMLButtonElement>,
        ButtonProps {
    mobileMode?: boolean;
    removeLabel?: boolean;
}

export function GettingStartedButton({
    mobileMode,
    removeLabel,
    ...props
}: GettingStartedButtonProps) {
    const router = useRouter();

    return (
        <Button
            {...props}
            className={cn(
                "flex gap-2 items-center font-semibold",
                props.className
            )}
            onClick={() => router.push("/auth")}
        >
            {!removeLabel && (
                <span
                    className={cn(mobileMode ? "hidden md:inline-block" : "")}
                >
                    Getting Started
                </span>
            )}

            <BarChart4 />
        </Button>
    );
}
