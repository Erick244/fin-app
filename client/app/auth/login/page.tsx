import { SignInForm } from "@/components/auth/forms/SignInForm";
import { SwitchAuthButton } from "@/components/auth/ui/SwitchAuthButton";
import { notExistCookieOrRedirect } from "@/functions/server-cookies";
import { AUTH_TOKEN_NAME, VERIFY_COOKIE_NAME } from "@/utils/constants";

export default function Page() {
    notExistCookieOrRedirect(AUTH_TOKEN_NAME, "/dashboard");
    notExistCookieOrRedirect(VERIFY_COOKIE_NAME, "/auth/verify");

    return (
        <div className="space-y-10 w-full">
            <div>
                <h1 className="text-3xl font-semibold text-center">
                    Enter an account
                </h1>
                <p className="text-muted-foreground text-center text-sm">
                    Fill in the information below to enter in your account.
                </p>
            </div>
            <div className="w-full p-5 md:p-0 space-y-5">
                <SignInForm />
                <div className="flex items-center justify-center gap-2">
                    <div className="h-0.5 w-1/3 bg-secondary" />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        NOT HAVE AN ACCOUNT
                    </span>
                    <div className="h-0.5 w-1/3 bg-secondary" />
                </div>
                <SwitchAuthButton pushTo="/auth/signup">
                    SignUp
                </SwitchAuthButton>
            </div>
        </div>
    );
}
