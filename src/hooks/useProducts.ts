import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api';
import { productCache } from '../services/cache';
import type { Product, FetchProductsParams } from '../types/product';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  total: number;
  fetchProducts: (params?: FetchProductsParams) => Promise<void>;
  retry: () => void;
}

export const useProducts = (initialParams: FetchProductsParams = {}): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialParams.page || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  
  const currentParams = useRef<FetchProductsParams>(initialParams);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  const fetchProductsData = useCallback(async (params: FetchProductsParams = {}, retryCount = 0) => {
    const updatedParams = { ...currentParams.current, ...params };
    currentParams.current = updatedParams;

    const cacheKey = productCache.generateKey(updatedParams);
    const cachedData = productCache.get(cacheKey);

    if (cachedData && retryCount === 0) {
      setProducts(cachedData.data);
      setPage(cachedData.page);
      setTotalPages(cachedData.totalPages);
      setTotal(cachedData.total);
      setIsLoading(false);
      setError(null);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.fetchProducts({
        ...updatedParams,
        signal: controller.signal
      });
      
      productCache.set(cacheKey, response);

      setProducts(response.data);
      setPage(response.page);
      setTotalPages(response.totalPages);
      setTotal(response.total);
      setIsLoading(false);
    } catch (err: any) {
      if (err.message === 'Aborted') {
        return;
      }

      if (retryCount < 2) {
        const backoff = (retryCount + 1) * 1000;
        retryTimeoutRef.current = window.setTimeout(() => {
          fetchProductsData(params, retryCount + 1);
        }, backoff);
      } else {
        setError(err.message || 'An unexpected error occurred');
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchProductsData(initialParams);
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const retry = useCallback(() => {
    fetchProductsData(currentParams.current);
  }, [fetchProductsData]);

  return {
    products,
    isLoading,
    error,
    page,
    totalPages,
    total,
    fetchProducts: fetchProductsData,
    retry,
  };
};
