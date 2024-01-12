"use client";

import { Nav } from "@/components/templates/nav";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
    {
        title: "About",
        href: "#about",
    },
    {
        title: "Informations",
        href: "#informations",
    },
    {
        title: "FeedBacks",
        href: "#feedBacks",
    },
    {
        title: "Contact",
        href: "#contact",
    },
];

export function NavItems() {
    const [hash, setHash] = useState<string | null>(null);
    const params = useParams();

    useEffect(() => {
        setHash(window.location.hash);
    }, [params]);

    return (
        <>
            {navLinks &&
                navLinks.map((navLink, i) => (
                    <Nav.Item
                        active={hash === navLink.href}
                        href={navLink.href}
                        key={i}
                    >
                        {navLink.title}
                    </Nav.Item>
                ))}
        </>
    );
}
