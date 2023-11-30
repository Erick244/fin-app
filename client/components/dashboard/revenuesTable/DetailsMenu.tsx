import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Calendar,
    CircleDollarSign,
    Delete,
    Edit,
    MessageSquare,
    MoreVertical,
    PlusCircle,
} from "lucide-react";

interface DetailsMenuProps {
    label: string;
    isPaid: boolean;
}

export function DetailsMenu({ label, isPaid }: DetailsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-4">
                <MoreVertical className="w-8 h-8 bg-secondary rounded-lg p-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 sm:w-60">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Description</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="sm:hidden visible">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Date</span>
                </DropdownMenuItem>

                {!isPaid && (
                    <DropdownMenuItem>
                        <CircleDollarSign className="mr-2 h-4 w-4" />
                        <span>Pay</span>
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Actions</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Delete className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
