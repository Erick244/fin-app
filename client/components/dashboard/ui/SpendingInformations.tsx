import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getData } from "@/functions/api";
import { formatAmountToDollar } from "@/functions/data";
import { cn } from "@/lib/utils";
import { SpendingInformations } from "@/models/SpendingInformations";
import {
    BarChart,
    Minus,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react";
import { HTMLAttributes } from "react";

const cardsHeader = {
    biggestMonthRevenue: {
        description:
            "This number is based on all of your paid revenue in the current month.",
        title: "Biggest Month Revenue",
    },
    totalMonthRevenue: {
        description:
            "This number is based on all of your paid revenue in the current month.",
        title: "Total Month Revenue",
    },
    averageSpending: {
        description: "This number is based on expenses per month.",
        title: "Average Spending",
    },
    totalRevenues: {
        description: "This number is based on all of your paid revenues.",
        title: "Total Revenues",
    },
};

export async function SpendingInformations(
    props: HTMLAttributes<HTMLDivElement>
) {
    const spendingInformations = await getData<SpendingInformations>(
        "/revenues/spendingInformations"
    );

    const biggestMonthRevenueHeader = cardsHeader.biggestMonthRevenue;
    const totalMonthRevenueHeader = cardsHeader.totalMonthRevenue;
    const averageSpendingHeader = cardsHeader.averageSpending;
    const totalRevenuesHeader = cardsHeader.totalRevenues;

    return (
        <div {...props} className={cn("h-full w-full", props.className)}>
            <h1 className="sm:text-4xl text-3xl text-center mb-6">Spending</h1>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 border-2 border-border p-4 rounded-lg">
                <SpendingCard
                    {...biggestMonthRevenueHeader}
                    spending={spendingInformations.biggestMonthRevenue / 1000}
                    latestSpending={
                        spendingInformations.biggestLatestMonthRevenue / 1000
                    }
                />
                <SpendingCard
                    {...totalMonthRevenueHeader}
                    spending={spendingInformations.totalMonthRevenue / 1000}
                    latestSpending={
                        spendingInformations.totalLatestMonthRevenue / 1000
                    }
                />
                <SpendingCard
                    {...averageSpendingHeader}
                    spending={spendingInformations.averageSpending / 1000}
                />
                <SpendingCard
                    {...totalRevenuesHeader}
                    spending={spendingInformations.totalRevenues / 1000}
                />
            </div>
        </div>
    );
}

interface SpendingCardProps {
    latestSpending?: number;
    spending: number;
    title: string;
    description: string;
}

function SpendingCard({
    description,
    latestSpending,
    spending,
    title,
}: SpendingCardProps) {
    function cardFooter() {
        const latestSpendingIsNaN = !latestSpending && latestSpending != 0;

        if (latestSpendingIsNaN) {
            return (
                <>
                    <Wallet />
                    <BarChart />
                </>
            );
        }

        const spentMore = spending > latestSpending;
        const spentLess = spending < latestSpending;

        const SpendingIcon = spentMore ? (
            <TrendingDown className="text-red-500" />
        ) : spentLess ? (
            <TrendingUp className="text-green-500" />
        ) : (
            <Minus className="text-zinc-500" />
        );

        return (
            <>
                <p className="text-sm text-foreground/50">
                    Latest Month: {formatAmountToDollar(latestSpending)}
                </p>

                {SpendingIcon}
            </>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl">{formatAmountToDollar(spending)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                {cardFooter()}
            </CardFooter>
        </Card>
    );
}
