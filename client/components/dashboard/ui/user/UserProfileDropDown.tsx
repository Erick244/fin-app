"use client";

import { UserProfileSkeleton } from "@/components/skeletons/components/UserProfileSkeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/contexts/auth/AuthContext";
import { LogOut, UserIcon } from "lucide-react";
import { HTMLAttributes } from "react";
import { LogOutDialog } from "../dialogs/LogOutDialog";
import { UserProfile } from "./UserProfile";

export function UserProfileDropDown(props: HTMLAttributes<HTMLElement>) {
    const { user, logOut } = useAuthContext();

    if (!user) return <UserProfileSkeleton />;

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger {...props}>
                <UserProfile {...user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
                <DropdownMenuLabel className="whitespace-nowrap overflow-hidden text-ellipsis text-xs sm:text-sm">
                    {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                    <UserIcon size={20} /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogOutDialog logOut={logOut}>
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="flex items-center gap-2 text-red-600 hover:text-red-600 hover:bg-red-600/10 focus:bg-red-600/10 focus:text-red-600"
                    >
                        <LogOut size={20} /> Exit
                    </DropdownMenuItem>
                </LogOutDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
