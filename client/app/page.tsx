import { About } from "@/components/home/sections/About";
import { Informations } from "@/components/home/sections/Informations";
import { Introduction } from "@/components/home/sections/Introduction";

export default function Home() {
    return (
        <div className="h-full w-full">
            <Introduction />
            <About />
            <Informations />
        </div>
    );
}
