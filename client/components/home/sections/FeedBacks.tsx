import { FeedBackSlider } from "../ui/FeedBackSlider";

export function FeedBacks() {
    return (
        <div
            id="feedBacks"
            className="flex flex-col items-center bg-foreground text-background p-5"
        >
            <h1 className="text-4xl text-center mb-6">FeedBacks</h1>
            <FeedBackSlider />
        </div>
    );
}
