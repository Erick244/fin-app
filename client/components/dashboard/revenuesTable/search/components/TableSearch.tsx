import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { SearchInput } from "../ui/SearchInput";
import { SearchTargetSelectMenu } from "../ui/SearchTargetSelectMenu";

export function TableSearch(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={cn("flex gap-2", props.className)}>
            <SearchTargetSelectMenu />
            <SearchInput />
        </div>
    );
}
