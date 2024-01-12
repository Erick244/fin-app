import { Button, ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { CreateRevenueForm } from "../forms/CreateRevenueForm";

export function AddRevenue(props: ButtonProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button {...props} className={cn("group", props.className)}>
                    <Plus className="group-hover:rotate-180 transition-all duration-300" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="space-y-7">
                    <h1 className="text-xl border-b-2 border-border pb-3">
                        Create Revenue
                    </h1>
                    <CreateRevenueForm />
                </div>
            </DialogContent>
        </Dialog>
    );
}
