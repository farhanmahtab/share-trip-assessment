import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import Header from '../layout/Header';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import Pagination from './Pagination';

const ProductPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  
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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    fetchProducts({ search: value, page: 1, category });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    fetchProducts({ category: value, page: 1, search: searchTerm });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts({ page: newPage, category, search: searchTerm });
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
