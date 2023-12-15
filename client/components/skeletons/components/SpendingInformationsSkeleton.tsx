import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function SpendingInformationsSkeleton(
    props: HTMLAttributes<HTMLDivElement>
) {
    return (
        <div {...props} className={cn("h-full w-full", props.className)}>
            <h1 className="sm:text-4xl text-3xl text-center mb-6">Spending</h1>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 border-2 border-border p-4 rounded-lg">
                <SpendingCardSkeleton />
                <SpendingCardSkeleton />
                <SpendingCardSkeleton />
                <SpendingCardSkeleton />
            </div>
        </div>
    );
}

function SpendingCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-6 w-9/12" />
                </CardTitle>
                <CardDescription className="space-y-2">
                    <Skeleton className="h-3 w-11/12" />
                    <Skeleton className="h-3 w-1/2" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl text-muted animate-pulse">$0.00</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Skeleton className="h-2 w-20" />
                <Skeleton className="h-5 w-5" />
            </CardFooter>
        </Card>
    );
}
