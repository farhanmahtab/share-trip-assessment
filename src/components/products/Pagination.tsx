import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}) => {
  if (totalPages <= 1) return null;

  return (
    <section className="mt-16 flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="p-3 glass-panel rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft size={24} />
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum = currentPage;
          if (currentPage <= 3) pageNum = i + 1;
          else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
          else pageNum = currentPage - 2 + i;

          if (pageNum < 1 || pageNum > totalPages) return null;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={isLoading}
              className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all ${
                currentPage === pageNum 
                  ? 'bg-primary text-white/4 shadow-lg shadow-primary/20 scale-110' 
                  : 'glass-panel border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="p-3 glass-panel rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

export default Pagination;
