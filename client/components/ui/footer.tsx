import { FinAppLogo } from "@/components/utils/FinAppLogo";
import { cn } from "@/lib/utils";
import {
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { HTMLAttributes } from "react";

export function Footer(props: HTMLAttributes<HTMLElement>) {
    return (
        <footer
            {...props}
            className={cn(
                "flex sm:flex-row flex-col gap-10 justify-between items-start p-10 border-t-2 border-border",
                props.className
            )}
        >
            <div className="flex gap-3">
                <FooterLink
                    href="https://www.linkedin.com/in/erick-henrique-36201b288/"
                    className="hover:bg-blue-500"
                >
                    <LinkedinIcon />
                </FooterLink>
                <FooterLink
                    href="https://github.com/Erick244"
                    className="hover:bg-black"
                >
                    <GithubIcon />
                </FooterLink>
            </div>
            <div className="space-y-3">
                <FinAppLogo />
                <div className="text-sm bg-secondary p-1 rounded">
                    erickcontato012@gmail.com
                </div>
            </div>
            <div className="flex gap-3">
                <FooterLink
                    href="https://www.facebook.com/"
                    className="hover:bg-blue-700"
                >
                    <FacebookIcon />
                </FooterLink>
                <FooterLink
                    href="https://twitter.com/"
                    className="hover:bg-blue-400"
                >
                    <TwitterIcon />
                </FooterLink>
                <FooterLink
                    href="https://www.instagram.com/"
                    className="hover:bg-purple-500"
                >
                    <InstagramIcon />
                </FooterLink>
            </div>
        </footer>
    );
}

interface FooterLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

function FooterLink({ children, href, ...rest }: FooterLinkProps) {
    return (
        <Link
            target="_blank"
            href={href}
            {...rest}
            className={cn(
                "bg-secondary p-2 rounded border-b border-secondary-foreground hover:text-white",
                rest.className
            )}
        >
            {children}
        </Link>
    );
}
