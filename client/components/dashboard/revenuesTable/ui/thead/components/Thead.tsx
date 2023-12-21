import { OrderButton } from "../ui/OrderButton";

export function Thead() {
    return (
        <thead className="border-b-2 border-border text-xs sm:text-base">
            <tr className="bg-secondary/70 text-xs sm:text-base">
                <th className="p-4 font-semibold">
                    <OrderButton paramValue="revenue">Revenue</OrderButton>
                </th>
                <th className="p-4 font-semibold">
                    <OrderButton paramValue="amount">Amount</OrderButton>
                </th>
                <th className="p-4 font-semibold">
                    <OrderButton paramValue="status">Status</OrderButton>
                </th>
                <th className="p-4 font-semibold sm:block hidden">
                    <OrderButton paramValue="date">
                        Transaction Date
                    </OrderButton>
                </th>
                <th className="p-4 font-semibold">Details</th>
            </tr>
        </thead>
    );
}
