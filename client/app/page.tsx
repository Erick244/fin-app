import { About } from "@/components/home/sections/About";
import { FeedBacks } from "@/components/home/sections/FeedBacks";
import { Informations } from "@/components/home/sections/Informations";
import { Introduction } from "@/components/home/sections/Introduction";
import { DiagonalSeparator } from "@/components/home/ui/DiagonalSeparator";

export default function Home() {
    return (
        <div className="h-full w-full">
            <Introduction />
            <About />
            <Informations />
            <DiagonalSeparator />
            <FeedBacks />
        </div>
    );
}
