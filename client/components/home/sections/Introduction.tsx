import { IntroductionChart } from "../ui/IntroductionChart";

export function Introduction() {
    return (
        <div className="bg-background h-3/4 flex flex-col sm:flex-row justify-center items-center">
            <IntroductionChart />
            <div className="h-full bg-foreground flex-grow">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Praesentium aliquid odio, accusantium deleniti hic vero quae,
                quidem sequi corrupti excepturi suscipit illum consectetur
                recusandae similique. In eum harum autem veritatis!
            </div>
        </div>
    );
}
