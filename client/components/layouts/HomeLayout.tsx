import { MobileMenu } from "../home/mobileMenu/MobileNavMenu";
import { ToggleMobileMenuButton } from "../home/mobileMenu/ToggleMobileMenuButton";
import { NavItems } from "../home/nav/NavItems";
import { GettingStartedButton } from "../home/ui/GettingStartedButton";
import { Header } from "../templates/header";
import { Nav } from "../templates/nav";
import { FinAppLogo } from "../utils/FinAppLogo";
import { ModeToggle } from "../utils/ModeToggle";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Header.Root className="flex justify-between items-center">
                <FinAppLogo />
                <Nav.Root className="hidden sm:flex sm:gap-10 md:gap-20">
                    <NavItems />
                </Nav.Root>
                <GettingStartedButton className=" sm:visible hidden" />
                <div className="flex items-center gap-5">
                    <ModeToggle />
                    <ToggleMobileMenuButton />
                </div>
            </Header.Root>
            <MobileMenu />
            {children}
        </div>
    );
}
