import { getData } from "@/functions/api";
import { transformQueryIfTargetIsAmount } from "@/functions/data";
import { SearchParams, TargetParam } from "@/models/PageProps";
import { Revenue } from "@/models/Revenue";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { TBody } from "../ui/TBody";
import { Thead } from "../ui/Thead";

export async function RevenueDataTable(searchParams: SearchParams) {
    const data = await getRevenueDataTable({ ...searchParams });

    return (
        <table className="w-full table-fixed border-collapse border-2 border-border">
            <Thead />
            <TBody data={data} />
        </table>
    );
}

async function getRevenueDataTable({
    page = "0",
    query = "",
    target = TargetParam.all,
}: SearchParams) {
    const numberPage = Number(page);
    const currentPage = numberPage > 0 ? numberPage - 1 : 0;

    const transformedQuery = transformQueryIfTargetIsAmount(target, query);
    const data = await getData<Revenue[]>(
        `/revenues?page=${currentPage}&take=${ITEMS_PER_PAGE}&query=${transformedQuery}`
    );

    return data;
}
