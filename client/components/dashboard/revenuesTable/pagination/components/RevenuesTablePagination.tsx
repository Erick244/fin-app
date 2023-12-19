import { Pagination } from "@/components/templates/pagination";
import { getData } from "@/functions/api";
import { transformQueryIfTargetIsAmount } from "@/functions/data";
import { SearchParams, TargetParam } from "@/models/PageProps";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { PageNumber } from "../ui/PageNumber";
import { PageSwitch } from "../ui/PageSwitch";

export async function RevenuesTablePagination(searchParams: SearchParams) {
    const { currentPage, nextPage, pagesCountArray, previousPage } =
        await getRevenuesTablePagination({ ...searchParams });

    return (
        <Pagination.Root className="rounded-b justify-between">
            <PageSwitch direction="previus" newPage={previousPage} />
            <div className="flex justify-center items-center gap-2">
                {pagesCountArray &&
                    pagesCountArray.map((page) => (
                        <PageNumber
                            currentPage={currentPage}
                            page={page}
                            key={page}
                        />
                    ))}
            </div>
            <PageSwitch direction="next" newPage={nextPage} />
        </Pagination.Root>
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
        pageParam > 0 && pageParam <= pagesCount ? pageParam : 1;

    const invalidPage = 0;
    const nextPage = currentPage === pagesCount ? invalidPage : currentPage + 1;
    const previousPage = currentPage === 1 ? invalidPage : currentPage - 1;

    return {
        previousPage,
        pagesCountArray,
        currentPage,
        nextPage,
    };
}
