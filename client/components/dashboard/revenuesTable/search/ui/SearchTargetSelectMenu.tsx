"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchTargetSelectMenu() {
    const { handleSelect } = useSearchTargetSelectMenu();

    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger className="sm:w-[180px] w-[100px]">
                <SelectValue placeholder="Search Target" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="transactionDate">Date</SelectItem>
                <SelectItem value="description">Description</SelectItem>
            </SelectContent>
        </Select>
    );
}

function useSearchTargetSelectMenu() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    function handleSelect(target: string) {
        const params = new URLSearchParams(searchParams);

        if (target) {
            params.set("target", target);
        } else {
            params.delete("target");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    return {
        handleSelect,
    };
}
