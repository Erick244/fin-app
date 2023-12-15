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

export async function getData<R>(
    url: string,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const req = await axios.get(url, config);
        const data = await req.data;

        return data;
    } catch (e: any) {
        throw getAxiosEsxceptionMessage(e);
    }
}

export async function patchData<R>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const req = await axios.patch(url, body, config);
        const data = await req.data;

        return data;
    } catch (e: any) {
        throw getAxiosEsxceptionMessage(e);
    }
}

export async function deleteData<R>(
    url: string,
    config?: AxiosRequestConfig
): Promise<R> {
    try {
        const req = await axios.delete(url, config);
        const data = await req.data;

        return data;
    } catch (e: any) {
        throw getAxiosEsxceptionMessage(e);
    }
}
