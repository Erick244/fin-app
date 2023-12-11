import { EmailCodeForm } from "@/components/auth/forms/EmailCodeForm";
import { ResendEmail } from "@/components/auth/ui/ResendEmail";
import { ReturnToSignup } from "@/components/auth/ui/ReturnToSignup";
import {
    existCookieOrRedirect,
    notExistCookieOrRedirect,
} from "@/functions/server-cookies";
import { AUTH_TOKEN_NAME, VERIFY_COOKIE_NAME } from "@/utils/constants";

export default function Page() {
    notExistCookieOrRedirect(AUTH_TOKEN_NAME, "/");
    existCookieOrRedirect(VERIFY_COOKIE_NAME, "/");

    return (
        <div className="space-y-10 w-full flex flex-col">
            <div>
                <h1 className="text-3xl font-semibold text-center">
                    Verification code
                </h1>
                <p className="text-muted-foreground text-center text-sm">
                    A verification code has been sent to your email.
                </p>
            </div>
            <div className="w-full p-5 md:p-0 space-y-5">
                <EmailCodeForm />
            </div>
            <ResendEmail className="self-center" />
            <ReturnToSignup className="absolute top-0 left-10" />
        </div>
    );
}
