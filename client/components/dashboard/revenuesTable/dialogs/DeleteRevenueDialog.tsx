import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { DeleteRevenueButton } from "./ui/DeleteRevenueButton";

interface DeleteRevenueDialogProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    title: string;
    revenueId: number;
}

export function DeleteRevenueDialog({
    children,
    title,
    revenueId,
    ...rest
}: DeleteRevenueDialogProps) {
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
                    <p className="text-red-600">
                        Do you want to <strong>DELETE</strong> this revenue
                        <strong> PERMANENTLY</strong>?
                    </p>
                    <div className="flex justify-between items-center">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <DeleteRevenueButton revenueId={revenueId} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
