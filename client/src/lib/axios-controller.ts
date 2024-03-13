import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https'

class AxiosController {
    static ssr = {
        get: <T = any>(url: string, config?: AxiosRequestConfig) =>
            AxiosController._request<T>(url, 'get', config, true),
        post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
            AxiosController._request<T>(url, 'post', config, true, data),
        put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
            AxiosController._request<T>(url, 'put', config, true, data),
        delete: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
            AxiosController._request<T>(url, 'delete', config, true, data),
    };

    static client = {
        get: <T = any>(url: string, config?: AxiosRequestConfig) =>
            AxiosController._request<T>(url, 'get', config, false),
        post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
            AxiosController._request<T>(url, 'post', config, false, data),
        put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
            AxiosController._request<T>(url, 'put', config, false, data),
        delete: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
            AxiosController._request<T>(url, 'delete', config, false, data),
    };

    private static async _request<T = any>(
        url: string,
        method: string,
        config: AxiosRequestConfig = {},
        isSSR: boolean = false,
        data: any = null
    ): Promise<T> {
        if (isSSR && (!process.env['INGRESS_URL'] || !process.env['DOMAIN_NAME'])) {
            throw new Error('ENV: INGRESS_URL or DOMAIN_NAME is not defined');
        }
        const baseUrl: string = isSSR ? process.env['INGRESS_URL'] as string : '';
        const defaultHeaders: Record<string, string> = isSSR ? { 'Host': 'ticketing.dev' } : {};

        if (isSSR && process.env.NODE_ENV !== 'production') {
            axios.defaults.httpsAgent = new https.Agent({
                rejectUnauthorized: false
            })
        }

        const mergedConfig: AxiosRequestConfig = {
            ...config,
            baseURL: baseUrl,
            headers: {
                ...defaultHeaders,
                ...(config.headers || {}),
            },
            method,
            url,
            data,
        };

        try {
            const response = await axios(mergedConfig);
            return response.data;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default AxiosController;
