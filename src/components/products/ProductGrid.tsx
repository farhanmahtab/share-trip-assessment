import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import ErrorState from '../common/ErrorState';
import type { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  error,
  onRetry
}) => {
  return (
    <main className="min-h-[400px]">
      <AnimatePresence mode="wait">
        {error ? (
          <ErrorState message={error} onRetry={onRetry} />
        ) : (
          <div key="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {isLoading && products.length === 0 ? (
              Array.from({ length: 12 }).map((_, i) => (
                <ProductSkeleton key={`skeleton-${i}`} />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : !isLoading && (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 text-xl">No products found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProductGrid;
