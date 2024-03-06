import { getCookie } from "@/functions/server-cookies";
import { AUTH_TOKEN_NAME } from "@/utils/constants";
import axios, { AxiosError } from "axios";

const instance = axios.create({
    baseURL: process.env.BASE_API_URL,
});

instance.interceptors.request.use(
    function (req) {
        const authToken = getCookie(AUTH_TOKEN_NAME);

        if (authToken) {
            req.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (resp) {
        return resp;
    },
    function (error: AxiosError) {
        const errorMessage = error.response ? error.response.data : "Error";
        const statusCode = error.response?.status;

        return Promise.reject({
            statusCode,
            errorMessage,
        });
    }
);

export default instance;
