import { getCookie } from "@/functions/server-cookies";
import { AUTH_TOKEN_NAME } from "@/utils/constants";
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.BASE_API_URL,
});

instance.interceptors.request.use(
    function (config) {
        const authToken = getCookie(AUTH_TOKEN_NAME);

        if (authToken) {
            config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
