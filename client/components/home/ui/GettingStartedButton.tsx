"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth/AuthContext";
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
    const { isAuth } = useAuthContext();

    function onClick() {
        if (isAuth()) {
            router.prefetch("/dashboard");
            router.push("/dashboard");
        } else {
            router.push("/auth/signup");
        }
    }

    return (
        <Button
            {...props}
            className={cn(
                "flex gap-2 items-center font-semibold",
                props.className
            )}
            onClick={onClick}
        >
            {!removeLabel && (
                <span
                    className={cn(mobileMode ? "hidden lg:inline-block" : "")}
                >
                    Getting Started
                </span>
            )}

            <BarChart4 />
        </Button>
    );
}
