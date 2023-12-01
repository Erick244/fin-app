import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { HTMLAttributes } from "react";

const cardsHeader = {
    biggestExpense: {
        description: "This number is based on all your paid revenue.",
        title: "Biggest Expense",
    },
    loweExpense: {
        description: "This number is based on all your paid revenue.",
        title: "Lower Expense",
    },
    averageSpending: {
        description: "This number is based on expenses per month.",
        title: "Average Spending",
    },
    trotalExpenses: {
        description: "This number is based on the last seven months.",
        title: "Total Expenses",
    },
};

export function SpendingInformations(props: HTMLAttributes<HTMLDivElement>) {
    const biggestExpenseHeader = cardsHeader.biggestExpense;
    const loweExpenseHeader = cardsHeader.loweExpense;
    const averageSpendingHeader = cardsHeader.averageSpending;
    const trotalExpensesHeader = cardsHeader.trotalExpenses;

    return (
        <div {...props} className={cn("h-full w-full", props.className)}>
            <h1 className="sm:text-4xl text-3xl text-center mb-6">Spending</h1>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 border-2 border-border p-4 rounded-lg">
                <SpendingCard
                    {...biggestExpenseHeader}
                    spending={11.99}
                    latestSpending={20.22}
                />
                <SpendingCard
                    {...loweExpenseHeader}
                    spending={1.99}
                    latestSpending={0.52}
                />
                <SpendingCard
                    {...averageSpendingHeader}
                    spending={1456.99}
                    latestSpending={1334.52}
                />
                <SpendingCard
                    {...trotalExpensesHeader}
                    spending={1456.99}
                    latestSpending={1456.99}
                />
            </div>
        </div>
    );
}

interface SpendingCardProps {
    latestSpending: number;
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
    const spentMore = spending > latestSpending;
    const spentLess = spending < latestSpending;

    const Icon = spentMore ? (
        <TrendingDown className="text-red-500" />
    ) : spentLess ? (
        <TrendingUp className="text-green-500" />
    ) : (
        <Minus className="text-zinc-500" />
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl">${spending}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="text-sm text-foreground/50">
                    Latest: ${latestSpending}
                </p>
                {Icon}
            </CardFooter>
        </Card>
    );
}
