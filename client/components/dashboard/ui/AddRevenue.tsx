import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateRevenueForm } from "../forms/CreateRevenueForm";

export function AddRevenue() {
    return (
        <Dialog>
            <DialogTrigger className="flex-shrink-0 group bg-foreground text-background py-2.5 px-4 rounded">
                <Plus className="transition-all duration-150 group-hover:rotate-90" />
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
