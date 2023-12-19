"use client";

import { Pagination } from "@/components/templates/pagination";
import { useDashboardParams } from "@/hooks/useDashboardParams";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageSwitchProps {
    direction: "next" | "previus";
    newPage: number;
}

export function PageSwitch({ direction, newPage }: PageSwitchProps) {
    const { createParamURL } = useDashboardParams();
    const Icon = direction === "next" ? <ChevronRight /> : <ChevronLeft />;

    return newPage ? (
        <Pagination.PageSwitch
            href={createParamURL("page", newPage.toString())}
        >
            {Icon}
        </Pagination.PageSwitch>
    ) : (
        <DisabledPageSwitch>{Icon}</DisabledPageSwitch>
    );
}

function DisabledPageSwitch({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center px-3 py-2 rounded text-muted-foreground cursor-not-allowed">
            {children}
        </div>
    );
}
