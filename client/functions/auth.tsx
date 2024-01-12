import { AUTH_TOKEN_NAME, OAUTH2_COOKIE_NAME } from "@/utils/constants";
import { redirect } from "next/navigation";
import { getCookie } from "./server-cookies";

export function isAuthorizedOrRedirectTo(redirectUrl: string) {
    const authToken = getCookie(AUTH_TOKEN_NAME);
    const oAuth2Cookie = getCookie(OAUTH2_COOKIE_NAME);

    if (!authToken && !oAuth2Cookie) {
        redirect(redirectUrl);
    }
}
