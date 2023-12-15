import { Pagination } from "@/components/templates/pagination";
import { getData } from "@/functions/api";
import { SearchParams } from "@/models/PageProps";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { PageNumber } from "./PageNumber";
import { PageSwitch } from "./PageSwitch";

interface RevenuesTablePaginationProps {
    searchParams: SearchParams;
}

export async function RevenuesTablePagination({
    searchParams,
}: RevenuesTablePaginationProps) {
    const count = await getData<number>("/revenues/count");

    const pagesCount = Math.round(count / ITEMS_PER_PAGE);
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const pageParam = Number(searchParams.page);
    const currentPage =
        pageParam > 0 && pageParam <= pagesCount ? pageParam : 1;

    const nextPage = currentPage === pagesCount ? 0 : currentPage + 1;
    const previousPage = currentPage === 1 ? 0 : currentPage - 1;

    return (
        <Pagination.Root className="rounded-b justify-between">
            <PageSwitch direction="previus" newPage={previousPage} />
            <div className="flex justify-center items-center gap-2">
                {pages &&
                    pages.map((page) => (
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
