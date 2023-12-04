import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { EditRevenueForm } from "../../forms/EditRevenueForm";

interface EditRevenueDialogProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    title: string;
    revenueId: number;
}

export function EditRevenueDialog({
    children,
    title,
    revenueId,
    ...rest
}: EditRevenueDialogProps) {
    return (
        <Dialog>
            <DialogTrigger {...rest} className={cn("w-full", rest.className)}>
                {children}
            </DialogTrigger>
            <DialogContent>
                <div className="space-y-7">
                    <h1 className="text-xl border-b-2 border-border pb-3">
                        {title}
                    </h1>
                    <EditRevenueForm revenueId={revenueId} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
