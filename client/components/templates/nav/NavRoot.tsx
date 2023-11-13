import { HTMLAttributes } from "react";

interface NavRootProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export function NavRoot({ children, ...rest }: NavRootProps) {
    return <nav {...rest}>{children}</nav>;
}
