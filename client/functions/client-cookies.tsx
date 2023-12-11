import { destroyCookie, parseCookies, setCookie } from "nookies";

export function getClientCookie(key: string) {
    const { [key]: cookie } = parseCookies();

    return cookie;
}

export function setClientCookie(key: string, value: any) {
    const ONE_MOUTH_IN_SECONDS = 60 * 60 * 60 * 24 * 30;

    setCookie(null, key, value, {
        maxAge: ONE_MOUTH_IN_SECONDS,
        path: "/",
    });
}

export function deleteClientCookie(key: string) {
    destroyCookie(null, key, {
        path: "/",
    });
}
