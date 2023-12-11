"use client";

import { Button } from "@/components/ui/button";
import { useVerifyCodeContext } from "@/contexts/auth/VerifyCodeContext";
import { ArrowLeft } from "lucide-react";
import { HTMLAttributes } from "react";

export function ReturnToSignup(props: HTMLAttributes<HTMLButtonElement>) {
    const { cancelVerification } = useVerifyCodeContext();

    return (
        <Button {...props} size={"icon"} onClick={cancelVerification}>
            <ArrowLeft />
        </Button>
    );
}
