"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useVerifyCodeContext } from "@/contexts/auth/VerifyCodeContext";
import { useTimer } from "@/hooks/useTimer";
import { HTMLAttributes, useState } from "react";

export function ResendEmail(props: HTMLAttributes<HTMLButtonElement>) {
    const startTime = 30;
    const endTime = 0;
    const { time, isCompleted, resetTimer } = useTimer(startTime, endTime);

    const [loading, setLoading] = useState<boolean>(false);
    const { cancelVerification, resendEmail } = useVerifyCodeContext();

    const isNotCompleted = !isCompleted;

    async function onClick() {
        setLoading(true);
        await resendEmail();
        resetTimer();
        setLoading(false);
    }

    return (
        <Button
            onClick={onClick}
            disabled={isNotCompleted}
            variant={isCompleted ? "outline" : "ghost"}
            {...props}
        >
            {loading ? (
                <Spinner />
            ) : (
                <span>
                    Resend e-mail {isNotCompleted && `in ${time} seconds.`}
                </span>
            )}
        </Button>
    );
}
