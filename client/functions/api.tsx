"use server";

import axios from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

export async function postData<R>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const resp = await axios.post(url, body, config);
        const data = await resp.data;
        return data;
    } catch (e: any) {
        return e;
    }
}

export async function getData<R>(
    url: string,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const resp = await axios.get(url, config);
        const data = await resp.data;

        return data;
    } catch (e: any) {
        return e;
    }
}

export async function patchData<R>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const resp = await axios.patch(url, body, config);
        const data = await resp.data;

        return data;
    } catch (e: any) {
        return e;
    }
}

export async function deleteData<R>(
    url: string,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const resp = await axios.delete(url, config);
        const data = await resp.data;

        return data;
    } catch (e: any) {
        return e;
    }
}
