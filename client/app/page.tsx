import { About } from "@/components/home/sections/About";
import { Contact } from "@/components/home/sections/Contact";
import { FeedBacks } from "@/components/home/sections/FeedBacks";
import { Informations } from "@/components/home/sections/Informations";
import { Introduction } from "@/components/home/sections/Introduction";
import { DiagonalSeparator } from "@/components/home/ui/DiagonalSeparator";
import { Footer } from "@/components/ui/footer";

export default function Home() {
    return (
        <div className="h-full w-full">
            <Introduction />
            <About />
            <Informations />
            <DiagonalSeparator />
            <FeedBacks />
            <DiagonalSeparator className="border-b-background border-r-foreground" />
            <Contact />
            <Footer className="mt-16" />
        </div>
    );
}
