import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { UserProfile } from "./UserProfile";

export function UserProfileDropDown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserProfile />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 sm:w-60">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                    <UserIcon size={20} /> Profile
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
