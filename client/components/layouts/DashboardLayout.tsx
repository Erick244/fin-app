import { UserProfileDropDown } from "../dashboard/ui/UserProfileDropDown";
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
                    <ModeToggle />
                    <UserProfileDropDown />
                </div>
            </Header.Root>
            <main className="h-full w-full">{children}</main>
        </div>
    );
}
