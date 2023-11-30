import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateRvenueForm } from "../forms/CreateRvenueForm";

export function AddRevenue() {
    return (
        <Dialog>
            <DialogTrigger className="transition-all duration-300 flex-shrink-0 group bg-foreground text-background py-2.5 px-4 rounded">
                <Plus className="group-hover:rotate-90" />
            </DialogTrigger>
            <DialogContent>
                <h1 className="text-xl mb-6">Create Revenue</h1>
                <CreateRvenueForm />
            </DialogContent>
        </Dialog>
    );
}
