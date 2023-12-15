import { RefreshDataButton } from "../dashboard/ui/RefreshDataButton";
import { UserProfileDropDown } from "../dashboard/ui/user/UserProfileDropDown";
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
            <Header.Root className="flex justify-between items-center">
                <FinAppLogo />

                <div className="flex items-center gap-5">
                    <RefreshDataButton />
                    <ModeToggle className="sm:flex hidden" />
                    <UserProfileDropDown className="sm:block hidden" />
                    <ToggleMobileMenuButton />
                </div>
            </Header.Root>
            <MobileMenu>
                <UserProfileDropDown className="w-full" />
                <ModeToggle className="w-full" />
            </MobileMenu>
            <main className="h-full w-full">{children}</main>
        </div>
    );
}
