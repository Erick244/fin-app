import { BarChart3, DollarSign, PiggyBank } from "lucide-react";
import { Card } from "../ui/Card";

export function About() {
    const lorem = `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Possimus nulla et autem labore placeat mollitia ex minus cum
                quod laudantium, doloremque esse quos ipsam tempore eligendi
                fugiat eius odit modi!`;

    const cards = {
        card1: {
            icon: DollarSign,
            text: lorem,
            title: "Dolar",
        },
        card2: {
            icon: BarChart3,
            text: lorem,
            title: "Charts",
        },
        card3: {
            icon: PiggyBank,
            text: lorem,
            title: "Revenues",
        },
    };

    return (
        <div
            id="about"
            className="p-5 flex justify-evenly items-center gap-10  flex-wrap"
        >
            <Card
                Icon={cards.card1.icon}
                text={cards.card1.text}
                title={cards.card1.title}
            />

            <Card
                Icon={cards.card2.icon}
                text={cards.card2.text}
                title={cards.card2.title}
            />
            <Card
                Icon={cards.card3.icon}
                text={cards.card3.text}
                title={cards.card3.title}
            />
        </div>
    );
}
