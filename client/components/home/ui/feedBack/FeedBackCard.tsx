import { TypographyP } from "@/components/ui/TypographyP";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface FeedBackCardProps extends HTMLAttributes<HTMLDivElement> {
    avatarImageUrl: string;
    avatarFallBack: string;
    name: string;
}

export function FeedBackCard({
    avatarImageUrl,
    avatarFallBack,
    name,
    ...rest
}: FeedBackCardProps) {
    return (
        <div
            {...rest}
            className={cn(
                "shrink-0 sm:w-96 w-80 p-4 flex flex-col justify-center items-center gap-5 border-2 border-border rounded-lg bg-background text-foreground shadow shadow-black/30",
                rest.className
            )}
        >
            <Avatar className="h-40 w-40">
                <AvatarImage
                    src={avatarImageUrl}
                    alt="Image of a person who gave feedback"
                />
                <AvatarFallback>{avatarFallBack}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl">{name}</h2>
            <TypographyP className="p-3 rounded-tr-lg rounded-bl-lg border-t border-b border-foreground">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Richard Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. A ea facilis, tenetur dolorem laboriosam maxime officiis
                sapiente maiores perspiciatis obcaecati illo vel quibusdam eius.
                Optio nobis debitis omnis non nulla. A ea facilis, tenetur
                dolorem laboriosam maxime officiis sapiente maiores perspiciatis
                obcaecati illo vel quibusdam eius. Optio nobis debitis omnis non
                nulla.
            </TypographyP>
        </div>
    );
}
