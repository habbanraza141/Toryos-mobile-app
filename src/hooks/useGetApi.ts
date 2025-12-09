import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../client/axiosInstance';

interface UseGetApiOptions {
    enabled?: boolean;
}

export const useGetApi = <T = any>(
    route: string,
    options?: UseGetApiOptions,
) => {
    const { enabled = true } = options || {};

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(enabled);
    const [error, setError] = useState<string | null>(null);
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(route);
            const finalData = response as T;
            setData(finalData);
        } catch (err: any) {
            setError(err?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [route]);

    useEffect(() => {
        if (enabled) {
            fetchData();
        }
    }, [fetchData, enabled]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
};
