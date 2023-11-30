import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { SearchTargetSelectMenu } from "./SearchTargetSelectMenu";

export function TableSearch(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={cn("flex gap-2", props.className)}>
            <SearchTargetSelectMenu />
            <Input placeholder="Search by Amount..." />
        </div>
    );
}
