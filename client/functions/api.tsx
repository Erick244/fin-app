"use server";

import axios from "@/lib/axios";
import { AxiosError, AxiosRequestConfig } from "axios";

export async function postData<R>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const req = await axios.post(url, body, config);
        const data = await req.data;

        return data;
    } catch (e: any) {
        throw getAxiosEsxceptionMessage(e);
    }
}

function getAxiosEsxceptionMessage(e: any) {
    const error = e as AxiosError;

    return error.response?.data ?? "";
}
