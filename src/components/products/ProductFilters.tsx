import React from 'react';
import { Search, ChevronRight, Loader2 } from 'lucide-react';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  isLoading: boolean;
  totalProducts: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  isLoading,
  totalProducts
}) => {
  return (
    <section className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="glass-panel flex items-center px-4 py-3 flex-1 max-w-md rounded-xl border border-white/10 bg-white/5 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
        <Search size={22} className="text-gray-500 mr-3" />
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none text-white outline-none w-full text-lg placeholder:text-gray-500"
        />
      </div>
      
      <div className="relative">
        <select 
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="glass-panel appearance-none px-6 py-3 pr-10 text-white outline-none cursor-pointer rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-lg"
        >
          <option value="" className="bg-[#1a1a1a]">All Categories</option>
          <option value="electronics" className="bg-[#1a1a1a]">Electronics</option>
          <option value="clothing" className="bg-[#1a1a1a]">Clothing</option>
          <option value="home" className="bg-[#1a1a1a]">Home</option>
          <option value="outdoors" className="bg-[#1a1a1a]">Outdoors</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <ChevronRight size={18} className="rotate-90" />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
         <span className="text-gray-500 text-sm hidden sm:inline">
           {totalProducts > 0 ? `Showing ${totalProducts} products` : 'No products found'}
         </span>
         {isLoading && <Loader2 size={18} className="text-primary animate-spin" />}
      </div>
    </section>
  );
};

export default ProductFilters;
