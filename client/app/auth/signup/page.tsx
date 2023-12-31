import { SignUpForm } from "@/components/auth/forms/SignUpForm";
import { SwitchAuthButton } from "@/components/auth/ui/SwitchAuthButton";
import { notExistCookieOrRedirect } from "@/functions/server-cookies";
import { AUTH_TOKEN_NAME, VERIFY_COOKIE_NAME } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default function Page() {
    notExistCookieOrRedirect(AUTH_TOKEN_NAME, "/dashboard");
    notExistCookieOrRedirect(VERIFY_COOKIE_NAME, "/auth/verify");

    return (
        <div className="space-y-10 w-full">
            <div>
                <h1 className="text-3xl font-semibold text-center">
                    Create an account
                </h1>
                <p className="text-muted-foreground text-center text-sm">
                    Fill in the information below to create your account.
                </p>
            </div>
            <div className="w-full p-5 md:p-0 space-y-5">
                <SignUpForm />
                <div className="flex items-center justify-center gap-2">
                    <div className="h-0.5 w-1/3 bg-secondary" />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        HAVE AN ACCOUNT
                    </span>
                    <div className="h-0.5 w-1/3 bg-secondary" />
                </div>
                <SwitchAuthButton pushTo="/auth/login">Login</SwitchAuthButton>
            </div>
        </div>
    );
}
