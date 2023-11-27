import { DashboardLayout } from "@/components/layouts/DashboardLayout";

interface LayoutProps {
    children: React.ReactNode;
}

export default function LayoutProps({ children }: LayoutProps) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
