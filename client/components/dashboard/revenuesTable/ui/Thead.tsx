export function Thead() {
    return (
        <thead className="border-b-2 border-border text-xs sm:text-base">
            <tr className="bg-secondary/70">
                <th className="p-4 font-semibold">Revenue</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold sm:block hidden">
                    Transaction Date
                </th>
                <th className="p-4 font-semibold">Details</th>
            </tr>
        </thead>
    );
}
