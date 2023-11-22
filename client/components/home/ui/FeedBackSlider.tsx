"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { HTMLAttributes } from "react";
import { FeedBackCard } from "./FeedBackCard";

function SliderChevron({
    direction,
    ...rest
}: { direction: "rigth" | "left" } & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className="hover:scale-105 bg-background/30 backdrop-blur-sm flex items-center justify-center p-2 rounded-full"
        >
            {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
        </button>
    );
}

export function FeedBackSlider() {
    return (
        <div className="relative sm:w-4/5 w-full flex justify-between items-center gap-3">
            <SliderChevron direction="left" />
            <div className="rounded-lg flex justify-start gap-5 items-center overflow-x-scroll snap-mandatory snap-x no-scrollbar">
                <FeedBackCard
                    className="snap-center"
                    avatarFallBack="SU"
                    avatarImageUrl="/avatars/person1.png"
                    name="Susan"
                />
                <FeedBackCard
                    className="snap-center"
                    avatarFallBack="RI"
                    avatarImageUrl="/avatars/person2.png"
                    name="Richard"
                />
                <FeedBackCard
                    className="snap-center"
                    avatarFallBack="MA"
                    avatarImageUrl="/avatars/person3.png"
                    name="Mary"
                />
                <FeedBackCard
                    className="snap-center"
                    avatarFallBack="KA"
                    avatarImageUrl="/avatars/person4.png"
                    name="Karen"
                />
                <FeedBackCard
                    className="snap-center"
                    avatarFallBack="AN"
                    avatarImageUrl="/avatars/person5.png"
                    name="Anthony"
                />
                <FeedBackCard
                    className="snap-center"
                    avatarFallBack="MI"
                    avatarImageUrl="/avatars/person6.png"
                    name="Michelle"
                />
            </div>
            <SliderChevron direction="rigth" />
        </div>
    );
}
