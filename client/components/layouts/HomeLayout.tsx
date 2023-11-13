import { Header } from "../templates/header";
import { Menu } from "../templates/menu";
import { Nav } from "../templates/nav";
import { FinAppLogo } from "../utils/FinAppLogo";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div>
            <Header.Root className="flex justify-between items-center">
                <FinAppLogo />
                <Nav.Root className="hidden sm:flex sm:gap-10 md:gap-20">
                    <Nav.Item href="#about">About</Nav.Item>
                    <Nav.Item href="#informations">Informations</Nav.Item>
                    <Nav.Item href="#feedBacks">FeedBacks</Nav.Item>
                    <Nav.Item href="#contact">Contact</Nav.Item>
                </Nav.Root>
                <div className="hidden sm:flex">a</div>

                <Menu.Button className="sm:hidden" />
            </Header.Root>
            {children}
        </div>
    );
}
