"use client";

import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface OrderButtonProps {
    children: React.ReactNode;
    paramValue: string;
}

export function OrderButton({ children, paramValue }: OrderButtonProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    function setOrderParam() {
        const params = new URLSearchParams(searchParams);
        const currentParamValue = params.get("tableOrder");

        if (currentParamValue === paramValue) {
            const invertOrderParamValue = currentParamValue + "-invert";
            params.set("tableOrder", invertOrderParamValue);
        } else {
            params.set("tableOrder", paramValue);
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Button
            size={"sm"}
            className="gap-1"
            variant={"ghost"}
            onClick={setOrderParam}
        >
            {children} <ChevronsUpDown className="w-4 h-4" />
        </Button>
    );
}
