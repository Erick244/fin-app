"use client";

import { PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { useDashboardParams } from "@/hooks/useDashboardParams";

interface PageNumberProps {
    page: number;
    currentPage: number;
}

export function PageNumber({ currentPage, page }: PageNumberProps) {
    const { createParamURL } = useDashboardParams();
    const isCurrentPage = currentPage === page;

    return (
        <PaginationItem>
            <PaginationLink
                isActive={isCurrentPage}
                href={createParamURL("page", page.toString())}
            >
                {page}
            </PaginationLink>
        </PaginationItem>
    );
}
