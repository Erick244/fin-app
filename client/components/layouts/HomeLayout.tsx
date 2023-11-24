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
        <div className="h-screen w-screen scroll-smooth overflow-x-hidden">
            <Header.Root className=" flex justify-between items-center">
                <FinAppLogo />
                <Nav.Root className="hidden sm:flex sm:gap-5 md:gap-10 lg:gap-20">
                    <NavItems />
                </Nav.Root>

                <div className="flex items-center gap-5">
                    <GettingStartedButton mobileMode />
                    <ModeToggle />
                    <ToggleMobileMenuButton />
                </div>
            </Header.Root>
            <MobileMenu />
            <main className="h-full w-full">{children}</main>
        </div>
    );
}
