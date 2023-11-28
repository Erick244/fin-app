import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Revenue } from "@/models/Revenue";
import {
    CircleDollarSign,
    Clock,
    Delete,
    Edit,
    MessageSquare,
    MoreVertical,
    PlusCircle,
} from "lucide-react";
import { HTMLAttributes } from "react";

interface RevenueDataTableProps extends HTMLAttributes<HTMLTableElement> {
    data: Revenue[];
}

export function RevenueDataTable({ data, ...rest }: RevenueDataTableProps) {
    return (
        <table
            {...rest}
            className={cn(
                "w-full table-fixed border-collapse border-2 border-border",
                rest.className
            )}
        >
            <Thead />
            <TBody data={data} />
        </table>
    );
}

function Thead() {
    return (
        <thead className="border-b-2 border-border">
            <tr className="bg-secondary/70">
                <th className="p-4 font-semibold">Revenue</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Transaction Date</th>
                <th className="p-4 font-semibold">Details</th>
            </tr>
        </thead>
    );
}

function TBody({ data }: RevenueDataTableProps) {
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

                    return (
                        <tr
                            key={revenue.id}
                            className="border-b border-border hover:bg-secondary/50"
                        >
                            <td className="text-center p-4">{revenueId}</td>
                            <td className="text-center p-4">{amount}</td>
                            <td className="text-center p-4">{status}</td>
                            <td className="text-center p-4">
                                {revenue.transactionDate
                                    ? `${revenue.transactionDate?.getMonth()}/${revenue.transactionDate?.getDate()}/${revenue.transactionDate?.getFullYear()}`
                                    : "No date"}
                            </td>
                            <th>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <MoreVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-20 sm:w-60">
                                        <DropdownMenuLabel>
                                            {revenueId}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>Description</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                <span>Actions</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Delete className="mr-2 h-4 w-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </th>
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
        <div className="flex items-center justify-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>Paying...</span>
        </div>
    );
}
