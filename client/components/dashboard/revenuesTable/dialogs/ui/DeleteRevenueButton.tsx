"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteData } from "@/functions/api";
import { checkForErrorInResponseData } from "@/functions/data";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteRevenueButtonProps {
    revenueId: number;
}

export function DeleteRevenueButton({ revenueId }: DeleteRevenueButtonProps) {
    const { deleteRevenue } = useDeleteRevenue(revenueId);

    return (
        <Button
            onClick={deleteRevenue}
            type="submit"
            variant="destructive"
            className="flex items-center gap-2"
        >
            <span>Delete</span> <Trash className="w-4 h-4" />
        </Button>
    );
}

function useDeleteRevenue(revenueId: number) {
    const router = useRouter();

    async function deleteRevenue() {
        try {
            const data = await deleteData(`/revenues/delete/${revenueId}`);

            checkForErrorInResponseData(data);

            router.refresh();
            toast({
                title: "Success",
                description: `RVN${revenueId} deleted.`,
                duration: 2000,
            });
        } catch (e: any) {
            toast({
                title: String(e.message),
                variant: "destructive",
            });
        }
    }

    return {
        deleteRevenue,
    };
}
