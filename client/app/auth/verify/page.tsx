import { EmailCodeForm } from "@/components/auth/forms/EmailCodeForm";
import {
    existCookieOrRedirect,
    notExistCookieOrRedirect,
} from "@/functions/server-cookies";
import { AUTH_TOKEN_NAME, VERIFY_COOKIE_NAME } from "@/utils/constants";

export default function Page() {
    //TODO: Desenvolver a opção do usuario reenviar o e-mal depois de um cooldawn
    //TODO: Desenvolver a opção do usuario editar o e-mail.

    notExistCookieOrRedirect(AUTH_TOKEN_NAME, "/");
    existCookieOrRedirect(VERIFY_COOKIE_NAME, "/");

    return (
        <div className="space-y-10 w-full">
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
        </div>
    );
}
