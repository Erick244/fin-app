import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "../templates/table";

export function RevenuesTableSkeleton() {
    return (
        <TableSkeleton.Root className="w-full">
            <TableSkeleton.THead>
                <TableSkeleton.Tr className="bg-secondary/70">
                    <TableSkeleton.Th />
                    <TableSkeleton.Th />
                    <TableSkeleton.Th />
                    <TableSkeleton.Th />
                    <TableSkeleton.Th className="sm:block hidden" />
                </TableSkeleton.Tr>
            </TableSkeleton.THead>
            <TableSkeleton.TBody>
                <TbodyRow />
                <TbodyRow />
                <TbodyRow />
                <TbodyRow />
                <TbodyRow />
                <TbodyRow />
            </TableSkeleton.TBody>
        </TableSkeleton.Root>
    );
}

function TbodyRow() {
    return (
        <TableSkeleton.Tr>
            <TableSkeleton.Td>
                <Skeleton className="h-3 w-10" />
            </TableSkeleton.Td>
            <TableSkeleton.Td>
                <Skeleton className="h-3 w-20" />
            </TableSkeleton.Td>
            <TableSkeleton.Td>
                <Skeleton className="h-3 w-28" />
            </TableSkeleton.Td>
            <TableSkeleton.Td>
                <Skeleton className="h-3 w-32" />
            </TableSkeleton.Td>
            <TableSkeleton.Td className="sm:block hidden">
                <Skeleton className="h-10 w-10" />
            </TableSkeleton.Td>
        </TableSkeleton.Tr>
    );
}
