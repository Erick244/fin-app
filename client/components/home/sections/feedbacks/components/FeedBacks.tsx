import { GettingStartedButton } from "../../../ui/GettingStartedButton";
import { FeedBackCarousel } from "../ui/FeedBackCarousel";

export function FeedBacks() {
    return (
        <div
            id="feedBacks"
            className="flex flex-col items-center bg-foreground text-background p-5"
        >
            <h1 className="text-4xl text-center mb-6">FeedBacks</h1>
            <FeedBackCarousel />
            <GettingStartedButton
                size={"lg"}
                className="mt-6 bg-background text-foreground hover:bg-secondary shadow shadow-black/30"
            />
        </div>
    );
}
