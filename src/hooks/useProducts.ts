import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api';
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

  const fetchProductsData = useCallback(async (params: FetchProductsParams = {}, retryCount = 0) => {
    setIsLoading(true);
    setError(null);
    currentParams.current = { ...currentParams.current, ...params };

    try {
      const response = await api.fetchProducts(currentParams.current);
      setProducts(response.data);
      setPage(response.page);
      setTotalPages(response.totalPages);
      setTotal(response.total);
      setIsLoading(false);
    } catch (err: any) {
      if (retryCount < 2) {
        // Linear backoff: 1s, 2s
        const backoff = (retryCount + 1) * 1000;
        console.warn(`Fetch failed, retrying in ${backoff}ms... (Attempt ${retryCount + 1})`);
        setTimeout(() => fetchProductsData(params, retryCount + 1), backoff);
      } else {
        setError(err.message || 'An unexpected error occurred');
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchProductsData(initialParams);
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
