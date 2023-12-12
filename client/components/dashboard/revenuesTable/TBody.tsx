import { extractFormatedDateFromIsoDate } from "@/functions/data";
import { Revenue } from "@/models/Revenue";
import { CircleDollarSign, Clock } from "lucide-react";
import { DetailsMenu } from "./DetailsMenu";

interface TBodyProps {
    data: Revenue[];
}

export function TBody({ data }: TBodyProps) {
    return (
        <tbody>
            {data &&
                data.map((revenue) => {
                    const revenueTableId = "RVN" + revenue.id;

                    const amountInDolarValue = revenue.amount / 1000;
                    const amount = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(amountInDolarValue);

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
