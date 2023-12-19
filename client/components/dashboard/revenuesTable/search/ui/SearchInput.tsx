"use client";

import { Input } from "@/components/ui/input";
import { TargetParam } from "@/models/PageProps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchInput() {
    const { handleSearch, inputType, queryParam, targetParam } =
        useSearchInput();

    return (
        <Input
            type={inputType}
            defaultValue={queryParam}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={`Search by ${targetParam ?? "all"}...`}
        />
    );
}

function useSearchInput() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    const inputTypes = {
        description: "text",
        transactionDate: "date",
        amount: "number",
        all: "search",
    };

    const queryParam = searchParams.get("query")?.toString();
    const targetParam = searchParams.get("target")?.toString();

    const inputType = targetParam
        ? inputTypes[targetParam as TargetParam]
        : inputTypes["all"];

    return {
        inputType,
        handleSearch,
        targetParam,
        queryParam,
    };
}
