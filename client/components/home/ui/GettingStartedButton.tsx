import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart4 } from "lucide-react";
import { HTMLAttributes } from "react";

interface GettingStartedButtonProps extends HTMLAttributes<HTMLButtonElement> {
    mobileMode?: boolean;
}

export function GettingStartedButton({
    mobileMode,
    ...props
}: GettingStartedButtonProps) {
    return (
        <Button
            {...props}
            className={cn(
                "flex gap-2 items-center font-semibold",
                props.className
            )}
        >
            <span className={cn(mobileMode ? "hidden md:inline-block" : "")}>
                Getting Started
            </span>
            <BarChart4 />
        </Button>
    );
}
