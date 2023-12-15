"use client";

import { Pagination } from "@/components/templates/pagination";
import { useDashboardParams } from "@/hooks/useDashboardParams";

interface PageNumberProps {
    page: number;
    currentPage: number;
}

export function PageNumber({ currentPage, page }: PageNumberProps) {
    const { createParamURL } = useDashboardParams();
    const isCurrentPage = currentPage === page;

    return (
        <Pagination.PageNumber
            href={createParamURL("page", page.toString())}
            pageIndex={page}
            current={isCurrentPage}
        />
    );
}
