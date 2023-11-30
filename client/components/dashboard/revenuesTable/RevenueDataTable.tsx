import { cn } from "@/lib/utils";
import { Revenue } from "@/models/Revenue";
import { HTMLAttributes } from "react";
import { TBody } from "./TBody";
import { Thead } from "./Thead";

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

async function fetchData(): Promise<Revenue[]> {
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log("FAKE LOAD TIME");
            resolve("FAKE LOAD TIME");
        }, 5000);
    });

    return tempData;
}

export async function RevenueDataTable(
    props: HTMLAttributes<HTMLTableElement>
) {
    // const data = await fetchData();

    return (
        <table
            {...props}
            className={cn(
                "w-full table-fixed border-collapse border-2 border-border",
                props.className
            )}
        >
            <Thead />
            <TBody data={tempData} />
        </table>
    );
}
