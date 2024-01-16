"use client";

import {
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useDashboardParams } from "@/hooks/useDashboardParams";

interface PageSwitchProps {
    direction: "next" | "previus";
    newPage: number;
}

export function PageSwitch({ direction, newPage }: PageSwitchProps) {
    const { createParamURL } = useDashboardParams();

    if (!newPage) {
        return;
    }

    return direction === "next" ? (
        <PaginationItem>
            <PaginationNext href={createParamURL("page", newPage.toString())} />
        </PaginationItem>
    ) : (
        <PaginationItem>
            <PaginationPrevious
                href={createParamURL("page", newPage.toString())}
            />
        </PaginationItem>
    );
}
