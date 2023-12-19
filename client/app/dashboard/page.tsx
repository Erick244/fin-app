import { SpendingBarChartWrapper } from "@/components/dashboard/charts/SpendingBarChartWrapper";
import { RevenueDataTable } from "@/components/dashboard/revenuesTable/components/RevenueDataTable";
import { RevenuesTablePagination } from "@/components/dashboard/revenuesTable/pagination/components/RevenuesTablePagination";
import { TableSearch } from "@/components/dashboard/revenuesTable/search/components/TableSearch";
import { AddRevenue } from "@/components/dashboard/ui/AddRevenue";
import { SpendingInformations } from "@/components/dashboard/ui/SpendingInformations";
import { PaginationSkeleton } from "@/components/skeletons/components/PaginationSkeleton";
import { RevenuesTableSkeleton } from "@/components/skeletons/components/RevenuesTableSkeleton";
import { SpendingInformationsSkeleton } from "@/components/skeletons/components/SpendingInformationsSkeleton";
import { Spinner } from "@/components/ui/spinner";
import { existCookieOrRedirect } from "@/functions/server-cookies";
import { PageProps } from "@/models/PageProps";
import { AUTH_TOKEN_NAME } from "@/utils/constants";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default function Page({ searchParams }: PageProps) {
    existCookieOrRedirect(AUTH_TOKEN_NAME, "/auth");

    return (
        <div className="sm:p-5 p-0 w-full h-full flex flex-col items-center gap-10">
            <div className="lg:w-4/5 w-full">
                <div className="flex items-center p-5 gap-5">
                    <TableSearch className="flex-grow" />
                    <AddRevenue />
                </div>
                <Suspense fallback={<RevenuesTableSkeleton />}>
                    <RevenueDataTable {...searchParams} />
                </Suspense>
                <Suspense fallback={<PaginationSkeleton />}>
                    <RevenuesTablePagination {...searchParams} />
                </Suspense>
            </div>
            <div className="w-full lg:w-11/12 h-1/2 flex justify-between items-center ms:gap-10 gap-28 lg:flex-row flex-col">
                <Suspense fallback={<Spinner className="w-10 h-10" />}>
                    <SpendingBarChartWrapper />
                </Suspense>
                <Suspense fallback={<SpendingInformationsSkeleton />}>
                    <SpendingInformations />
                </Suspense>
            </div>
        </div>
    );
}
