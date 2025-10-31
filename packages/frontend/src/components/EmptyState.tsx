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
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring', 
            delay: 0.1,
            duration: 0.6,
            bounce: 0.5
          }}
          className="text-8xl mb-6 inline-block"
        >
          {emoji}
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring', 
            delay: 0.1,
            duration: 0.6,
            bounce: 0.5
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-3xl mb-6 shadow-lg hover:shadow-xl hover:shadow-primary-500/20"
        >
          <Icon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
        </motion.div>
      )}
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed"
      >
        {description}
      </motion.p>
      
      {actionText && actionLink && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to={actionLink}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(251, 146, 60, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary text-lg"
            >
              {actionText}
            </motion.button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
