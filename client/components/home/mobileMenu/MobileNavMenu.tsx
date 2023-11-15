"use client";

import { mobileMenuVisibilityAtom } from "@/atoms/VisibilityAtoms";
import { useVisibilityAtom } from "@/hooks/useVisibilityAtom";
import { cn } from "@/lib/utils";
import { Menu } from "../../templates/menu";
import { CloseArea } from "../../utils/CloseArea";
import { NavItems } from "../nav/NavItems";

export function MobileMenu() {
    const { isVisible: mobileMenuIsVisible, hiddenVisibility } =
        useVisibilityAtom(mobileMenuVisibilityAtom);

    return (
        <>
            <CloseArea
                className={cn(
                    "sm:hidden",
                    mobileMenuIsVisible ? "visible" : "hidden"
                )}
                onClick={hiddenVisibility}
            />
            <Menu.Root
                className={cn(
                    "sm:hidden absolute right-0 flex flex-col gap-10 transition-all",
                    mobileMenuIsVisible ? "w-1/2" : "w-0 p-0"
                )}
            >
                {mobileMenuIsVisible && <NavItems />}
            </Menu.Root>
        </>
    );
}
