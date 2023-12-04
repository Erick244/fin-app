import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";
import { HTMLAttributes } from "react";

interface PayRevenueDialogProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    title: string;
    revenueId: number;
}

export function PayRevenueDialog({
    children,
    title,
    revenueId,
    ...rest
}: PayRevenueDialogProps) {
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
                    <p>Do you want to mark this revenue as paid?</p>
                    <div className="flex justify-between items-center">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                        >
                            <span>Pay</span>
                            <CircleDollarSign className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
