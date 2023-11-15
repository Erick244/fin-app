"use client";

import { mobileMenuVisibilityAtom } from "@/atoms/VisibilityAtoms";
import { Menu } from "@/components/templates/menu";
import { useVisibilityAtom } from "@/hooks/useVisibilityAtom";

export function ToggleMobileMenuButton() {
    const { toggleVisibility, isVisible: mobileMenuIsVisible } =
        useVisibilityAtom(mobileMenuVisibilityAtom);

    return (
        <Menu.Button
            menuIsOpen={mobileMenuIsVisible}
            className="sm:hidden"
            onClick={toggleVisibility}
        />
    );
}
