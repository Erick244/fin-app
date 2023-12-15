"use client";

import { usePathname, useSearchParams } from "next/navigation";

export function useDashboardParams() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function createParamURL(param: string, value: string) {
        const params = new URLSearchParams(searchParams);
        params.set(param, value);

        return `${pathname}?${params.toString()}`;
    }

    return {
        createParamURL,
    };
}
