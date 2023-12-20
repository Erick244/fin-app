"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { FeedBackCard } from "./FeedBackCard";

export function FeedBackSlider() {
    const { cardRef, moveToLeft, moveToRigth, sliderRef } = useFeedBackSlider();

    return (
        <div className="relative sm:w-4/5 w-full flex justify-between items-center gap-3">
            <button
                onClick={moveToLeft}
                className="sm:block hidden p-2 hover:bg-background rounded-full hover:text-foreground group"
            >
                <ChevronLeft className="w-8 h-8 group-active:-translate-x-1" />
            </button>
            <div
                ref={sliderRef}
                className="no-scrollbar rounded-lg flex justify-start gap-5 items-center overflow-x-scroll p-2 snap-x snap-mandatory"
            >
                <FeedBackCard
                    ref={cardRef}
                    className="snap-center"
                    avatarFallBack="SU"
                    avatarImageUrl="/avatars/person1.png"
                    name="Susan"
                />

                <FeedBackCard
                    ref={cardRef}
                    className="snap-center"
                    avatarFallBack="RI"
                    avatarImageUrl="/avatars/person2.png"
                    name="Richard"
                />
                <FeedBackCard
                    ref={cardRef}
                    className="snap-center"
                    avatarFallBack="MA"
                    avatarImageUrl="/avatars/person3.png"
                    name="Mary"
                />
                <FeedBackCard
                    ref={cardRef}
                    className="snap-center"
                    avatarFallBack="KA"
                    avatarImageUrl="/avatars/person4.png"
                    name="Karen"
                />
                <FeedBackCard
                    ref={cardRef}
                    className="snap-center"
                    avatarFallBack="AN"
                    avatarImageUrl="/avatars/person5.png"
                    name="Anthony"
                />
                <FeedBackCard
                    ref={cardRef}
                    className="snap-center"
                    avatarFallBack="MI"
                    avatarImageUrl="/avatars/person6.png"
                    name="Michelle"
                />
            </div>
            <button
                onClick={moveToRigth}
                className="sm:block hidden p-2 hover:bg-background rounded-full hover:text-foreground group"
            >
                <ChevronRight className="w-8 h-8 group-active:translate-x-1" />
            </button>
        </div>
    );
}

function useFeedBackSlider() {
    const sliderRef = useRef(null);
    const cardRef = useRef(null);

    const LAST_CARD = 5;
    const FIRST_CARD = 0;
    const [cardNumber, setCardNumber] = useState<number>(FIRST_CARD);

    function moveToRigth() {
        if (cardNumber === LAST_CARD) return;

        const slider = sliderRef.current as unknown as Element;
        const card = cardRef.current as unknown as Element;

        setCardNumber((cardNumber) => {
            const nextCard = cardNumber + 1;
            const moveTo = card.clientWidth * nextCard;

            slider.scrollTo({
                left: moveTo,
                behavior: "smooth",
            });

            return nextCard;
        });
    }

    function moveToLeft() {
        if (cardNumber === FIRST_CARD) return;

        const slider = sliderRef.current as unknown as Element;
        const card = cardRef.current as unknown as Element;

        setCardNumber((cardNumber) => {
            const previousCard = cardNumber - 1;
            const moveTo = card.clientWidth * previousCard;

            slider.scrollTo({
                left: moveTo,
                behavior: "smooth",
            });

            return previousCard;
        });
    }

    return {
        sliderRef,
        cardRef,
        moveToLeft,
        moveToRigth,
    };
}
