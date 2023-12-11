import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function getCookie(key: string) {
    const cookie = cookies().get(key);

    return cookie?.value;
}

export function existCookieOrRedirect(cookieKey: string, redirectPaht: string) {
    const notExistCookie = !getCookie(cookieKey);

    if (notExistCookie) {
        redirect(redirectPaht);
    }
}

export function notExistCookieOrRedirect(
    cookieKey: string,
    redirectPaht: string
) {
    const existCookie = !!getCookie(cookieKey);

    if (existCookie) {
        redirect(redirectPaht);
    }
}
