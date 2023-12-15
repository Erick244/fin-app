import { getData } from "@/functions/api";
import { Revenue } from "@/models/Revenue";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { TBody } from "./TBody";
import { Thead } from "./Thead";

interface RevenueDataTableProps {
    page: number;
}

export async function RevenueDataTable({ page = 0 }: RevenueDataTableProps) {
    const currentPage = page > 0 ? page - 1 : 0;

    const data = await getData<Revenue[]>(
        `/revenues?page=${currentPage}&take=${ITEMS_PER_PAGE}`
    );

    return (
        <table className="w-full table-fixed border-collapse border-2 border-border">
            <Thead />
            <TBody data={data} />
        </table>
    );
}
