import { Pagination } from "@/components/templates/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationSkeleton() {
    return (
        <Pagination.Root className="rounded-b justify-between">
            <div className="animate-pulse flex justify-center items-center px-3 py-2 rounded text-muted-foreground cursor-not-allowed">
                <ChevronLeft />
            </div>
            <div className="flex justify-center items-center gap-2">
                <div>
                    <Skeleton className="h-8 w-8" />
                </div>
                <div>
                    <Skeleton className="h-8 w-8" />
                </div>
                <div>
                    <Skeleton className="h-8 w-8" />
                </div>
            </div>
            <div className="animate-pulse flex justify-center items-center px-3 py-2 rounded text-muted-foreground cursor-not-allowed">
                <ChevronRight />
            </div>
        </Pagination.Root>
    );
}
