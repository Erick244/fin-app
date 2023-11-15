"use client";

import { PrimitiveAtom, useAtom } from "jotai";

export function useVisibilityAtom(visibilityAtom: PrimitiveAtom<boolean>) {
    const [isVisible, setVisibility] = useAtom(visibilityAtom);

    function toggleVisibility() {
        setVisibility(!isVisible);
    }

    function hiddenVisibility() {
        setVisibility(false);
    }

    return {
        isVisible,
        setVisibility,
        toggleVisibility,
        hiddenVisibility,
    };
}
