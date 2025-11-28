import { AxiosError } from 'axios';
import axiosInstance, { basePath } from '../axiosInstance.ts';
import * as Sentry from '@sentry/react-native';

type FetchOptions = {
    params?: Record<string, any>;
    data?: any;
    headers?: Record<string, string>;
};

// GET
export const apiGet = async (endpoint: string, options?: FetchOptions) => {
    return await axiosInstance.get(basePath + endpoint, {
        params: options?.params,
        headers: options?.headers,
    });
};

// POST
export const apiPost = async (endpoint: string, data?: any, options?: FetchOptions) => {
    return await axiosInstance.post(basePath + endpoint, data, {
        params: options?.params,
        headers: options?.headers,
    });
};

// PUT
export const apiPut = async (endpoint: string, data?: any, options?: FetchOptions) => {
    return await axiosInstance.put(basePath + endpoint, data, {
        params: options?.params,
        headers: options?.headers,
    });
};

// PATCH
export const apiPatch = async (endpoint: string, data?: any, options?: FetchOptions) => {
    return await axiosInstance.patch(basePath + endpoint, data, {
        params: options?.params,
        headers: options?.headers,
    });
};

// DELETE
export const apiDelete = async (endpoint: string, options?: FetchOptions) => {
    return await axiosInstance.delete(basePath + endpoint, {
        params: options?.params,
        headers: options?.headers,
    });
};

export const extractAxiosErrorMessage = (err: unknown): string => {

    const error = err as AxiosError<{ message?: string }>;
    Sentry.captureException(error);
    return error.response?.data?.message || error.message || 'Unexpected error';
};