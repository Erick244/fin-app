import { HTMLAttributes } from "react";

interface MenuRootProps extends HTMLAttributes<HTMLMenuElement> {
    children: React.ReactNode;
}

export function MenuRoot({ children, ...rest }: MenuRootProps) {
    return <menu {...rest}>{children}</menu>;
}
