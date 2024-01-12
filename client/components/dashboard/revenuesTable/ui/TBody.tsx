import {
    extractFormatedDateFromIsoDate,
    formatAmountToDollar,
} from "@/functions/data";
import { cn } from "@/lib/utils";
import { Revenue } from "@/models/Revenue";
import { CircleDollarSign, Clock, SearchX } from "lucide-react";
import { AddRevenue } from "../../ui/AddRevenue";
import { DetailsMenu } from "../components/DetailsMenu";

interface TBodyProps {
    data: Revenue[];
    query: string | undefined;
}

export function TBody({ data, query }: TBodyProps) {
    const dataIsNotEmpty = data.length > 0;
    const dataIsEmpty = !dataIsNotEmpty;

    return (
        <tbody>
            {dataIsNotEmpty &&
                data.map((revenue) => {
                    const revenueTableId = "RVN" + revenue.id;

                    const amount = formatAmountToDollar(revenue.amount / 1000);

                    const status = revenue.isPaid ? (
                        <PaidStatus />
                    ) : (
                        <NotPaidStatus />
                    );

                    const transactionDate = revenue.transactionDate;
                    const transactionDateFormated = transactionDate
                        ? extractFormatedDateFromIsoDate(transactionDate)
                        : "No Date";

                    return (
                        <tr
                            key={revenue.id}
                            className="border-b border-border hover:bg-secondary/60"
                        >
                            <td className="text-center p-4">
                                {revenueTableId}
                            </td>
                            <td className="text-center p-4">{amount}</td>
                            <td className="text-center p-4">{status}</td>
                            <td className="text-center p-4 text-sm sm:block hidden">
                                {transactionDateFormated}
                            </td>
                            <td className="text-center">
                                <DetailsMenu
                                    revenue={revenue}
                                    label={revenueTableId}
                                />
                            </td>
                        </tr>
                    );
                })}
            {dataIsEmpty && query && (
                <>
                    <NoResultsRow
                        colSpan={5}
                        className="sm:table-cell hidden"
                    />
                    <NoResultsRow
                        colSpan={4}
                        className="table-cell sm:hidden"
                    />
                </>
            )}

            {dataIsEmpty && !query && (
                <>
                    <FirstRevenueRow
                        colSpan={5}
                        className="sm:table-cell hidden"
                    />
                    <FirstRevenueRow
                        colSpan={4}
                        className="table-cell sm:hidden"
                    />
                </>
            )}
        </tbody>
    );
}

function PaidStatus() {
    return (
        <div className="flex items-center justify-center text-green-600">
            <CircleDollarSign className="mr-2 h-4 w-4" />
            <span>Paid</span>
        </div>
    );
}

function NotPaidStatus() {
    return (
        <div className="flex items-center justify-center text-foreground/70">
            <Clock className="mr-2 h-4 w-4" />
            <span>Not Paid</span>
        </div>
    );
}

function NoResultsRow(props: {
    colSpan: number;
    className?: string | undefined;
}) {
    return (
        <tr>
            <td
                {...props}
                className={cn("p-20 text-muted-foreground", props.className)}
                align="center"
            >
                <SearchX />
                <span className="text-sm">No results.</span>
            </td>
        </tr>
    );
}

function FirstRevenueRow(props: {
    colSpan: number;
    className?: string | undefined;
}) {
    return (
        <tr>
            <td
                {...props}
                className={cn("p-20", props.className)}
                align="center"
            >
                <div className="flex flex-col items-center gap-2">
                    <AddRevenue variant={"outline"} size={"lg"} />
                    <span className="text-sm">Try creating one revenue.</span>
                </div>
            </td>
        </tr>
    );
}
