import { About } from "@/components/home/sections/About";
import { Contact } from "@/components/home/sections/Contact";
import { FeedBacks } from "@/components/home/sections/feedbacks/components/FeedBacks";
import { Informations } from "@/components/home/sections/Informations";
import { Introduction } from "@/components/home/sections/Introduction";
import { DiagonalSeparator } from "@/components/home/ui/DiagonalSeparator";
import { HomeLayout } from "@/components/layouts/HomeLayout";
import { Footer } from "@/components/ui/footer";

export default function Home() {
    return (
        <HomeLayout>
            <Introduction />
            <About />
            <Informations />
            <DiagonalSeparator />
            <FeedBacks />
            <DiagonalSeparator className="border-b-background border-r-foreground" />
            <Contact />
            <Footer className="mt-16" />
        </HomeLayout>
    );
}
