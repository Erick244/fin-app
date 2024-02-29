import { getData } from "@/functions/api";
import {
	extractSimpleDateFromIsoDate,
	transformQueryIfTargetIsAmount,
} from "@/functions/data";
import { SearchParams, TableOrderParam, TargetParam } from "@/models/PageProps";
import { Revenue } from "@/models/Revenue";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { TBody } from "../ui/TBody";
import { Thead } from "../ui/thead/components/Thead";

export async function RevenueDataTable(searchParams: SearchParams) {
    const data = await getRevenueDataTable({ ...searchParams });

    return (
        <table className="w-full table-fixed border-collapse border-2 border-border">
            <Thead />
            <TBody data={data} query={searchParams.query} />
        </table>
    );
}

async function getRevenueDataTable({
    page = "0",
    query = "",
    target = TargetParam.all,
    tableOrder,
}: SearchParams) {
    const numberPage = Number(page);
    const currentPage = numberPage > 0 ? numberPage - 1 : 0;

    const transformedQuery = transformQueryIfTargetIsAmount(target, query);
    const data = await getData<Revenue[]>(
        `/revenues?page=${currentPage}&take=${ITEMS_PER_PAGE}&query=${transformedQuery}`
    );

    return orderTableBy(tableOrder, data);
}

function orderTableBy(
    orderType: TableOrderParam | undefined,
    data: Revenue[]
): Revenue[] {
    if (!orderType) return data;

    const orderFunctions = {
        [TableOrderParam.revenue]: orderByRevenueId,
        [TableOrderParam.revenueInvert]: orderByRevenueIdInvert,
        [TableOrderParam.amount]: orderByAmount,
        [TableOrderParam.amountInvert]: orderByAmountInvert,
        [TableOrderParam.date]: orderByDate,
        [TableOrderParam.dateInvert]: orderByDateInvert,
        [TableOrderParam.status]: orderByStatus,
        [TableOrderParam.statusInvert]: orderByStatusInvert,
    };

    return orderFunctions[orderType](data);
}

const orderByRevenueId = (data: Revenue[]): Revenue[] => {
    return data.sort((a, b) => (a.id > b.id ? 1 : -1));
};

const orderByRevenueIdInvert = (data: Revenue[]): Revenue[] => {
    return orderByRevenueId(data).reverse();
};

const orderByAmount = (data: Revenue[]): Revenue[] => {
    return data.sort((a, b) => (a.amount > b.amount ? 1 : -1));
};

const orderByAmountInvert = (data: Revenue[]): Revenue[] => {
    return orderByAmount(data).reverse();
};

const orderByDate = (data: Revenue[]): Revenue[] => {
    return data.sort((a, b) => {
        const aDate = extractSimpleDateFromIsoDate(
            a.transactionDate
        )?.getTime();
        const bDate = extractSimpleDateFromIsoDate(
            b.transactionDate
        )?.getTime();

        if (!aDate || !bDate) return 0;

        return aDate > bDate ? 1 : -1;
    });
};

const orderByDateInvert = (data: Revenue[]): Revenue[] => {
    return orderByDate(data).reverse();
};

const orderByStatus = (data: Revenue[]): Revenue[] => {
    return data.sort((a, b) => {
        if (a.isPaid && !b.isPaid) return 1;
        if (!a.isPaid && b.isPaid) return -1;

        return 0;
    });
};

const orderByStatusInvert = (data: Revenue[]): Revenue[] => {
    return orderByStatus(data).reverse();
};
