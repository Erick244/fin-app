import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { SearchInput } from "./SearchInput";
import { SearchTargetSelectMenu } from "./SearchTargetSelectMenu";

export function TableSearch(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={cn("flex gap-2", props.className)}>
            <SearchTargetSelectMenu />
            <SearchInput />
        </div>
    );
}
