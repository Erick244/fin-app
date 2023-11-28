import { RevenueDataTable } from "@/components/dashboard/table/RevenueDataTable";
import { Revenue } from "@/models/Revenue";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
};

const tempData: Revenue[] = [
    {
        id: 1,
        amount: 12.3 * 1000,
        description: "Description Test 1",
        isPaid: true,
        transactionDate: new Date(),
    },
    {
        id: 2,
        amount: 321.31 * 1000,
        description: "Description Test 2",
        isPaid: true,
        transactionDate: new Date(),
    },
    {
        id: 3,
        amount: 45.34 * 1000,
        description: "Description Test 3",
        isPaid: true,
        transactionDate: new Date(),
    },
    {
        id: 4,
        amount: 65.34 * 1000,
        description: "Description Test 4",
        isPaid: false,
        transactionDate: null,
    },
    {
        id: 5,
        amount: 3213.4 * 1000,
        description: "Description Test 5",
        isPaid: true,
        transactionDate: new Date(),
    },
    {
        id: 6,
        amount: 3213.25 * 1000,
        description: "Description Test 6",
        isPaid: false,
        transactionDate: null,
    },
];

export default function Page() {
    return (
        <div className="w-1/2">
            <RevenueDataTable data={tempData} />
        </div>
    );
}
