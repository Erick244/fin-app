"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useVerifyCodeContext } from "@/contexts/auth/VerifyCodeContext";
import { useTimer } from "@/hooks/useTimer";
import { HTMLAttributes, useState } from "react";

export function ResendEmail(props: HTMLAttributes<HTMLButtonElement>) {
    const { isNotCompleted, loading, resend, time, isCompleted } =
        useResendEmail();

    return (
        <Button
            onClick={resend}
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

function useResendEmail() {
    const startTime = 30;
    const endTime = 0;
    const { time, isCompleted, resetTimer } = useTimer(startTime, endTime);

    const [loading, setLoading] = useState<boolean>(false);
    const { resendEmail } = useVerifyCodeContext();

    const isNotCompleted = !isCompleted;

    async function resend() {
        setLoading(true);
        await resendEmail();
        resetTimer();
        setLoading(false);
    }

    return {
        isNotCompleted,
        time,
        loading,
        resend,
        isCompleted,
    };
}
