import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-4"
        >
          <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 dark:text-primary-400" />
        </motion.div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-semibold">
          Завантаження...
        </p>
      </motion.div>
    </div>
  );
}
