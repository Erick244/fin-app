"use client";

import { HTMLAttributes } from "react";
import Gravatar from "react-gravatar";

interface UserGravatarProps extends HTMLAttributes<HTMLImageElement> {
    email: string;
}

export function UserGravatar({ email, ...rest }: UserGravatarProps) {
    return <Gravatar {...rest} email={email} />;
}
