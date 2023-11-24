"use client";
import { FeedBackCard } from "./FeedBackCard";

export function FeedBackSlider() {
    return (
        <div className="relative sm:w-4/5 w-full flex justify-between items-center gap-3">
            <div className="slider-scroll rounded-lg flex justify-start gap-5 items-center overflow-x-scroll p-2 snap-x snap-mandatory">
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
        </div>
    );
}
