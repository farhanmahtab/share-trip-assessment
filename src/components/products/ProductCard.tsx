import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full max-w-sm overflow-hidden"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-square w-full bg-[#F2F2F2] rounded-[16px] overflow-hidden shadow-sm flex items-center justify-center p-4"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col mt-4">
        {/* Brand */}
        <span 
          className="text-[#757575] text-[14px] font-normal leading-tight"
        >
          {product.category}
        </span>

        {/* Title */}
        <h3 
          className="text-[#333333] text-[20px] font-semibold mt-1 line-clamp-2 leading-snug"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-3">
          <span className="text-[#0F75BD] text-[24px] font-bold">
            ৳ {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
