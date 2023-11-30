import { SpendingBarChart } from "@/components/dashboard/charts/SpendingBarChart";
import { RevenueDataTable } from "@/components/dashboard/revenuesTable/RevenueDataTable";
import { TableSearch } from "@/components/dashboard/revenuesTable/search/TableSearch";
import { AddRevenue } from "@/components/dashboard/ui/AddRevenue";
import { RevenuesTableSkeleton } from "@/components/skeletons/components/RevenuesTableSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default function Page() {
    return (
        <div className="sm:p-5 p-0 w-full h-full flex flex-col items-center gap-10">
            <div className="lg:w-4/5 w-full">
                <div className="flex items-center p-5 gap-5">
                    <TableSearch className="flex-grow" />
                    <AddRevenue />
                </div>
                <Suspense fallback={<RevenuesTableSkeleton />}>
                    <RevenueDataTable />
                </Suspense>
            </div>
            <div className="md:w-4/5 lg:w-1/2 w-full h-1/2">
                <SpendingBarChart />
            </div>
        </div>
    );
}
