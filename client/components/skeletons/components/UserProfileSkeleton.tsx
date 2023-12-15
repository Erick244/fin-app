import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileSkeleton() {
    return (
        <div className="cursor-not-allowed flex items-center gap-3 border-2 border-border p-2 rounded">
            <Skeleton className="border-2 border-border w-10 h-10 rounded-full" />
            <div className="whitespace-nowrap overflow-hidden text-ellipsis w-20 sm:max-w-md text-left">
                <Skeleton className="w-full h-2" />
            </div>
        </div>
    );
}
