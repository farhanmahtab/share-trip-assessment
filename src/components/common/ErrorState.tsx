import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border-red-500/20 bg-red-500/5"
    >
      <AlertCircle size={64} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-white mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-400 text-center max-w-md mb-6">
        {message}
      </p>
      <button 
        onClick={onRetry}
        className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 group"
      >
        <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        Try Again
      </button>
    </motion.div>
  );
};

export default ErrorState;
