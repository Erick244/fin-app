"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

interface SwitchAuthButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    pushTo: string;
}

export function SwitchAuthButton({
    children,
    pushTo,
    ...rest
}: SwitchAuthButtonProps) {
    const router = useRouter();

    return (
        <Button
            {...rest}
            variant={"outline"}
            className={cn("w-full", rest.className)}
            onClick={() => router.push(pushTo)}
        >
            {children}
        </Button>
    );
}
