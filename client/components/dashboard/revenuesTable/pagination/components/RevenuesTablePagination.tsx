import { getData } from "@/functions/api";
import { transformQueryIfTargetIsAmount } from "@/functions/data";
import { SearchParams, TargetParam } from "@/models/PageProps";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { PageNumber } from "../ui/PageNumber";
import { PageSwitch } from "../ui/PageSwitch";

import { Pagination, PaginationContent } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export async function RevenuesTablePagination(searchParams: SearchParams) {
    const { currentPage, nextPage, pagesCountArray, previousPage, havePages } =
        await getRevenuesTablePagination({ ...searchParams });

    const enablePagination = nextPage > 0 || previousPage > 0;

    return (
        <Pagination
            className={cn(
                "p-2 rounded-b-lg",
                havePages ? "visible" : "invisible"
            )}
        >
            {enablePagination && (
                <PaginationContent>
                    <PageSwitch direction="previus" newPage={previousPage} />
                    {havePages &&
                        pagesCountArray.map((page) => (
                            <PageNumber
                                currentPage={currentPage}
                                page={page}
                                key={page}
                            />
                        ))}
                    <PageSwitch direction="next" newPage={nextPage} />
                </PaginationContent>
            )}
        </Pagination>
    );
}

async function getRevenuesTablePagination({
    page = "0",
    query = "",
    target = TargetParam.all,
}: SearchParams) {
    const transformedQuery = transformQueryIfTargetIsAmount(target, query);
    const count = await getData<number>(
        `/revenues/count?query=${transformedQuery}`
    );

    const pagesCount = Math.ceil(count / ITEMS_PER_PAGE);

    const pagesCountArray = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const pageParam = Number(page);
    const currentPage =
        pageParam >= 1 && pageParam <= pagesCount ? pageParam : 0;

    const invalidPage = 0;
    const nextPage = currentPage === pagesCount ? invalidPage : currentPage + 1;
    const previousPage = currentPage === 0 ? invalidPage : currentPage - 1;

    const havePages = pagesCountArray.length > 0;

    return {
        previousPage,
        pagesCountArray,
        currentPage,
        nextPage,
        havePages,
    };
}
