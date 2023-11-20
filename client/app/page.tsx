import { About } from "@/components/home/sections/About";
import { Introduction } from "@/components/home/sections/Introduction";

export default function Home() {
    return (
        <div className="h-full w-full">
            <Introduction />
            <About />
        </div>
    );
}
