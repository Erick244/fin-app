import { MobileMenu } from "../home/mobileMenu/MobileNavMenu";
import { ToggleMobileMenuButton } from "../home/mobileMenu/ToggleMobileMenuButton";
import { Header } from "../templates/header";
import { FinAppLogo } from "../utils/FinAppLogo";
import { ModeToggle } from "../utils/ModeToggle";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="h-screen w-screen scroll-smooth overflow-x-hidden">
            <Header.Root className=" flex justify-between items-center">
                <FinAppLogo />

                <div className="flex items-center gap-5">
                    <ModeToggle />
                    <ToggleMobileMenuButton />
                </div>
            </Header.Root>
            <MobileMenu>Await</MobileMenu>
            <main className="h-full w-full">{children}</main>
        </div>
    );
}
