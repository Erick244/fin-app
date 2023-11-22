import { TypographyP } from "@/components/ui/TypographyP";
import Image from "next/image";

export function Informations() {
    return (
        <div
            id="informations"
            className="p-5 flex flex-col lg:flex-row justify-between xl:justify-evenly items-center gap-5"
        >
            <div className="max-w-3xl">
                <h1 className="text-4xl mb-5">Informations</h1>
                <div className="border-2 border-border p-3 rounded-lg">
                    <TypographyP className="bg-foreground rounded text-background p-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non sequi doloremque possimus impedit incidunt? Libero
                        iusto tenetur nam architecto sapiente corporis,
                        blanditiis aut dicta eius, ratione expedita distinctio
                        quo officia! Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Non sequi doloremque possimus impedit
                        incidunt? Libero iusto tenetur nam architecto sapiente
                        corporis, blanditiis aut dicta eius, ratione expedita
                        distinctio quo officia!
                    </TypographyP>
                    <br />
                    <TypographyP className="p-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Dolor commodi facilis fugiat animi autem nulla
                        error, quas vero eaque inventore totam molestiae, iure
                        laudantium? Aspernatur tempore quo porro natus aut!
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Dolor commodi facilis fugiat animi autem nulla
                        error, quas vero eaque inventore totam molestiae, iure
                        laudantium? Aspernatur tempore quo porro natus aut!
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Dolor commodi facilis fugiat animi autem nulla
                        error, quas vero eaque inventore totam molestiae, iure
                        laudantium? Aspernatur tempore quo porro natus aut!
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Dolor commodi facilis fugiat animi autem nulla
                        error, quas vero eaque inventore totam molestiae, iure
                        laudantium? Aspernatur tempore quo porro natus aut!
                    </TypographyP>
                </div>
            </div>
            <div className="p-2 shadow-2xl shadow-foreground border-l-4 border-foreground rounded overflow-hidden">
                <Image
                    width={500}
                    height={500}
                    src={"/benjamin-graham.webp"}
                    alt="Photo representing Benjamin Graham"
                />
            </div>
        </div>
    );
}
