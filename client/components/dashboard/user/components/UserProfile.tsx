import { Avatar } from "@/components/ui/avatar";
import { UserGravatar } from "../ui/UserGravatar";

interface UserProfileProps {
    name: string;
    email: string;
}

export function UserProfile({ name, email }: UserProfileProps) {
    return (
        <div className="flex items-center gap-3 border-2 border-border p-2 rounded hover:bg-secondary/70 cursor-pointer">
            <Avatar className="border-2 border-border">
                <UserGravatar email={email ? email : name} />
            </Avatar>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full sm:max-w-md text-left">
                {name}
            </div>
        </div>
    );
}
