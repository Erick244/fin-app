import { TypographyP } from "@/components/ui/TypographyP";
import { LucideIcon } from "lucide-react";
import { GettingStartedButton } from "./GettingStartedButton";

interface CardProps {
    Icon: LucideIcon;
    title: string;
    text: string;
}

export function Card({ Icon, text, title }: CardProps) {
    return (
        <div className="group h-80 w-80 sm:h-96 sm:w-96 [perspective:1000px]">
            <div className="border-2 relative h-full w-full rounded-md shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                    <Icon className="w-full h-full group-hover:blur transition-all duration-500" />
                </div>
                <div className="flex flex-col justify-between p-4 absolute inset-0 h-full w-full rounded-xl bg-background/70 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <h1 className="text-2xl">{title}</h1>
                    <TypographyP className="text-sm sm:text-base">
                        {text}
                    </TypographyP>
                    <GettingStartedButton removeLabel />
                </div>
            </div>
        </div>
    );
}
