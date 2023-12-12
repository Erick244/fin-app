"use client";
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
import { Revenue } from "@/models/Revenue";
import {
    Calendar,
    CircleDollarSign,
    Delete,
    Edit,
    MessageSquare,
    MoreVertical,
    PlusCircle,
} from "lucide-react";
import { DeleteRevenueDialog } from "./dialogs/DeleteRevenueDialog";
import { EditRevenueDialog } from "./dialogs/EditRevenueDialog";
import { PayRevenueDialog } from "./dialogs/PayRevenueDialog";

interface DetailsMenuProps {
    label: string;
    revenue: Revenue;
}

export function DetailsMenu({ label, revenue }: DetailsMenuProps) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="p-4">
                <MoreVertical className="w-8 h-8 bg-secondary rounded-lg p-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 sm:w-60">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <EditRevenueDialog revenue={revenue} title={label}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Description</span>
                    </DropdownMenuItem>
                </EditRevenueDialog>

                {revenue.isPaid ? (
                    <EditRevenueDialog
                        revenue={revenue}
                        title={label}
                        className="sm:hidden inline"
                    >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Date</span>
                        </DropdownMenuItem>
                    </EditRevenueDialog>
                ) : (
                    <PayRevenueDialog
                        revenueId={revenue.id}
                        title={`Pay - ${label}`}
                    >
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <CircleDollarSign className="mr-2 h-4 w-4" />
                            <span>Pay</span>
                        </DropdownMenuItem>
                    </PayRevenueDialog>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Actions</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <EditRevenueDialog
                                revenue={revenue}
                                title={`Edit - ${label}`}
                            >
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                            </EditRevenueDialog>

                            <DeleteRevenueDialog
                                revenueId={revenue.id}
                                title={`Delete - ${label}`}
                            >
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <Delete className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DeleteRevenueDialog>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
