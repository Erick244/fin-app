import { FinAppLogo } from "@/components/utils/FinAppLogo";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="h-screen w-screen flex justify-center items-center md:flex-row flex-col sm:gap-20 gap-10">
            <FinAppLogo size="MD" className="sm:hidden flex" />
            <FinAppLogo size="LG" className="sm:flex hidden" />
            {children}
        </div>
    );
}
