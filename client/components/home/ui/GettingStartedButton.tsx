import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart4 } from "lucide-react";
import { HTMLAttributes } from "react";

export function GettingStartedButton(props: HTMLAttributes<HTMLButtonElement>) {
    return (
        <Button
            {...props}
            className={cn(
                "flex gap-2 items-center font-semibold",
                props.className
            )}
        >
            Getting Started <BarChart4 />
        </Button>
    );
}
