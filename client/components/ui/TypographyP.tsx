import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TypographyPProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}

export function TypographyP({ children, ...rest }: TypographyPProps) {
    return (
        <p {...rest} className={cn("leading-7", rest.className)}>
            {children}
        </p>
    );
}
