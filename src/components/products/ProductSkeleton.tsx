import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-sm overflow-hidden">
      {/* Image Container Skeleton */}
      <div 
        className="relative aspect-square w-full bg-gray-200 rounded-[16px] overflow-hidden"
      >
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col mt-4 space-y-2">
        {/* Brand Skeleton */}
        <div className="h-4 w-20 bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>

        {/* Title Skeleton */}
        <div className="h-6 w-full bg-gray-200 rounded relative overflow-hidden">
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>

        {/* Price Skeleton */}
        <div className="h-8 w-24 bg-gray-200 rounded relative overflow-hidden mt-1">
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
