import React, { useState, useEffect, useRef } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import Header from '../layout/Header';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';

const ProductPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const isFirstRender = useRef(true);
  
  const { 
    products, 
    isLoading, 
    error, 
    page, 
    totalPages, 
    total,
    fetchProducts,
    retry 
  } = useProducts({ limit: 12 });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    fetchProducts({ search: debouncedSearchTerm, page: 1, category });
  }, [debouncedSearchTerm, category, fetchProducts]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts({ page: newPage, category, search: debouncedSearchTerm });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <Header />

      <ProductFilters 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        isLoading={isLoading}
        totalProducts={total}
      />

      <ProductGrid 
        products={products}
        isLoading={isLoading}
        error={error}
        onRetry={retry}
      />

      <Pagination 
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductPage;
