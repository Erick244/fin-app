import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { HTMLAttributes } from "react";

interface LogOutDialogProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    logOut: () => void;
}

export function LogOutDialog({ children, logOut, ...rest }: LogOutDialogProps) {
    return (
        <Dialog>
            <DialogTrigger {...rest} className={cn("w-full", rest.className)}>
                {children}
            </DialogTrigger>
            <DialogContent>
                <div className="space-y-7">
                    <h1 className="text-xl border-b-2 border-border pb-3">
                        Log Out
                    </h1>
                    <p>Do you want to disconnect your account?</p>
                    <div className="flex justify-between items-center">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={logOut}
                            type="submit"
                            variant="destructive"
                            className="flex items-center gap-2"
                        >
                            <span>Exit</span> <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
