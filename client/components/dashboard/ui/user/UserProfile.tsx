import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserGravatar } from "./UserGravatar";

export function UserProfile() {
    return (
        <div className="flex items-center gap-3 border-2 border-border p-2 rounded hover:bg-secondary/70 cursor-pointer">
            <Avatar className="border-2 border-border">
                <UserGravatar email="erick@dev.com" />
                <AvatarFallback>EH</AvatarFallback>
            </Avatar>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis w-20 sm:w-full">
                Erick Henrique
            </div>
        </div>
    );
}
