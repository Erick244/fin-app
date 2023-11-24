import { TypographyP } from "@/components/ui/TypographyP";
import { ContactForm } from "../ui/contact/ContactForm";

export function Contact() {
    return (
        <div id="contact" className="p-5 flex justify-center items-center">
            <div className="border-2 border-border rounded-lg p-5 space-y-6">
                <h1 className="text-4xl text-center">Contact</h1>
                <TypographyP className="text-center">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ratione a commodi maiores dolorum? Vero, deserunt nobis.
                </TypographyP>
                <ContactForm />
            </div>
        </div>
    );
}
