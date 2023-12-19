"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useTimer } from "@/hooks/useTimer";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

export function RefreshDataButton(props: HTMLAttributes<HTMLButtonElement>) {
    const { isCompleted, refresh } = useRefreshDataButton();

    return (
        <Button
            {...props}
            onClick={refresh}
            size={"icon"}
            disabled={!isCompleted}
            className={cn("group", props.className)}
        >
            <RefreshCcw className="transition-all duration-300 group-hover:-rotate-180" />
        </Button>
    );
}

function useRefreshDataButton() {
    const router = useRouter();
    const { isCompleted, resetTimer } = useTimer(10, 0);

    function refresh() {
        if (!isCompleted) return;

        router.refresh();
        toast({
            title: "Success",
            description: "The data has been updated.",
        });
        resetTimer();
    }

    return {
        refresh,
        isCompleted,
    };
}
