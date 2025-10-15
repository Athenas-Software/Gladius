import axios, { AxiosInstance } from "axios";

export const createApiClient = (baseURL: string, sub: string): AxiosInstance => {
    return axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            sub: sub
        },
        auth: {
            username: process.env.APIXUSER || '',
            password: process.env.APIXPASS || ''
        }
    });
};
