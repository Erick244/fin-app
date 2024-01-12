import { TypographyP } from "@/components/ui/TypographyP";
import { GettingStartedButton } from "../ui/GettingStartedButton";
import { IntroductionChart } from "../ui/IntroductionChart";

export function Introduction() {
    return (
        <div
            id="introduction"
            className="bg-background h-3/4 flex flex-col md:flex-row justify-around items-center"
        >
            <IntroductionChart />
            <div className="bg-foreground flex gap-3 flex-col justify-center items-center h-full w-full flex-grow rounded text-primary-foreground">
                <h1 className="transition-all duration-300 text-center md:text-5xl text-3xl font-semibold p-4 rounded text-primary-foreground">
                    <span>MANAGE YOUR </span>
                    <span className="transition-all duration-300 p-1 rounded font-bold text-primary bg-background">
                        FINACES
                    </span>
                    <span> HERE!</span>
                </h1>
                <TypographyP className="text-center sm:w-1/2 w-full">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Cumque ea nostrum sit dicta neque omnis nisi voluptatibus
                    fuga accusantium mollitia sed, at libero, vitae sapiente.
                    Veritatis aut doloribus similique molestias.
                </TypographyP>
                <GettingStartedButton
                    size={"lg"}
                    className="bg-background text-foreground hover:bg-secondary shadow shadow-black/30"
                />
            </div>
        </div>
    );
}
