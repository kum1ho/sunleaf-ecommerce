import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  emoji?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  emoji
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-4"
    >
      {emoji ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="text-8xl mb-6"
        >
          {emoji}
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-3xl mb-6 shadow-lg"
        >
          <Icon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
        </motion.div>
      )}
      
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {actionText && actionLink && (
        <Link to={actionLink}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            {actionText}
          </motion.button>
        </Link>
      )}
    </motion.div>
  );
}
