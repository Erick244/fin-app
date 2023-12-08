import { FinAppLogo } from "@/components/utils/FinAppLogo";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="h-screen w-screen flex justify-center items-center md:flex-row flex-col sm:gap-20 gap-10 bg-gradient-to-bl from-foreground/30 from-5% to-background to-30%">
            <FinAppLogo size="MD" className="sm:hidden flex" />
            <FinAppLogo size="LG" className="sm:flex hidden" />
            <main className="md:w-1/2 lg:w-1/3 w-full">{children}</main>
        </div>
    );
}
