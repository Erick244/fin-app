import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { FeedBackCard } from "./FeedBackCard";

export function FeedBackCarousel() {
    return (
        <Carousel
            opts={{
                align: "center",
                startIndex: 2,
                loop: true,
            }}
            className="w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl"
        >
            <CarouselContent>
                <CarouselItem className="basis-full sm:basis-[76%] md:basis-[70%] lg:basis-[47%] xl:basis-[37%]">
                    <FeedBackCard
                        className="snap-center"
                        avatarFallBack="SU"
                        avatarImageUrl="/avatars/person1.png"
                        name="Susan"
                    />
                </CarouselItem>

                <CarouselItem className="basis-full sm:basis-[76%] md:basis-[70%] lg:basis-[47%] xl:basis-[37%]">
                    <FeedBackCard
                        className="snap-center"
                        avatarFallBack="RI"
                        avatarImageUrl="/avatars/person2.png"
                        name="Richard"
                    />
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-[76%] md:basis-[70%] lg:basis-[47%] xl:basis-[37%]">
                    <FeedBackCard
                        className="snap-center"
                        avatarFallBack="MA"
                        avatarImageUrl="/avatars/person3.png"
                        name="Mary"
                    />
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-[76%] md:basis-[70%] lg:basis-[47%] xl:basis-[37%]">
                    <FeedBackCard
                        className="snap-center"
                        avatarFallBack="KA"
                        avatarImageUrl="/avatars/person4.png"
                        name="Karen"
                    />
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-[76%] md:basis-[70%] lg:basis-[47%] xl:basis-[37%]">
                    <FeedBackCard
                        className="snap-center"
                        avatarFallBack="AN"
                        avatarImageUrl="/avatars/person5.png"
                        name="Anthony"
                    />
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-[76%] md:basis-[70%] lg:basis-[47%] xl:basis-[37%]">
                    <FeedBackCard
                        className="snap-center"
                        avatarFallBack="MI"
                        avatarImageUrl="/avatars/person6.png"
                        name="Michelle"
                    />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-background rounded sm:rounded-full text-foreground h-full -left-10 sm:-left-12 sm:h-8" />
            <CarouselNext className="bg-background text-foreground rounded sm:rounded-full h-full -right-10 sm:-right-12 sm:h-8" />
        </Carousel>
    );
}
