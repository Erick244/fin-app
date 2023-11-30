import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SearchTargetSelectMenu() {
    return (
        <Select>
            <SelectTrigger className="sm:w-[180px] w-[100px]">
                <SelectValue placeholder="Search Target" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="id">Revenue ID</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="transactionDate">Date</SelectItem>
                <SelectItem value="description">Description</SelectItem>
            </SelectContent>
        </Select>
    );
}
