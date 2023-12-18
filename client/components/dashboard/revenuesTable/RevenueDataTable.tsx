import { getData } from "@/functions/api";
import { SearchParams, TargetParam } from "@/models/PageProps";
import { Revenue } from "@/models/Revenue";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { TBody } from "./TBody";
import { Thead } from "./Thead";

interface RevenueDataTableProps {
    searchParams: SearchParams;
}

export async function RevenueDataTable({
    searchParams: { page = "0", query = "", target = TargetParam.all },
}: RevenueDataTableProps) {
    const numberPage = Number(page);
    const currentPage = numberPage > 0 ? numberPage - 1 : 0;

    function transformedQuery() {
        const isNumber = target === TargetParam.amount || !isNaN(Number(query));
        if (isNumber) {
            return (Number(query) * 1000).toString();
        }

        return query;
    }

    const data = await getData<Revenue[]>(
        `/revenues?page=${currentPage}&take=${ITEMS_PER_PAGE}&query=${transformedQuery()}`
    );

    return (
        <table className="w-full table-fixed border-collapse border-2 border-border">
            <Thead />
            <TBody data={data} />
        </table>
    );
}
