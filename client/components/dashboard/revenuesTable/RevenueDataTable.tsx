import { getData } from "@/functions/api";
import { cn } from "@/lib/utils";
import { Revenue } from "@/models/Revenue";
import { HTMLAttributes } from "react";
import { TBody } from "./TBody";
import { Thead } from "./Thead";

export async function RevenueDataTable(
    props: HTMLAttributes<HTMLTableElement>
) {
    const data = await getData<Revenue[]>("/revenues");

    return (
        <table
            {...props}
            className={cn(
                "w-full table-fixed border-collapse border-2 border-border",
                props.className
            )}
        >
            <Thead />
            <TBody data={data} />
        </table>
    );
}
