import { Revenue } from "@/models/Revenue";
import { format } from "date-fns";
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
                    const revenueId = "RVN" + revenue.id;

                    const amountInRealValue = revenue.amount / 1000;
                    const amount = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(amountInRealValue);

                    const status = revenue.isPaid ? (
                        <PaidStatus />
                    ) : (
                        <NotPaidStatus />
                    );

                    const transactionDate = revenue.transactionDate
                        ? format(revenue.transactionDate, "PPP")
                        : "No Date";

                    return (
                        <tr
                            key={revenue.id}
                            className="border-b border-border hover:bg-secondary/50"
                        >
                            <td className="text-center p-4">{revenueId}</td>
                            <td className="text-center p-4">{amount}</td>
                            <td className="text-center p-4">{status}</td>
                            <td className="text-center p-4 text-sm sm:block hidden">
                                {transactionDate}
                            </td>
                            <td className="text-center">
                                <DetailsMenu
                                    isPaid={revenue.isPaid}
                                    label={revenueId}
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
        <div className="flex items-center justify-center text-green-500">
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
