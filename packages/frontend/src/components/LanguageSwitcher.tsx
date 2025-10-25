import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ua', name: 'UA', flag: '🇺🇦' },
    { code: 'en', name: 'EN', flag: '🇬🇧' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/10 dark:bg-gray-800/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all text-gray-700 dark:text-gray-200">
        <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="font-semibold uppercase text-xs sm:text-sm">{i18n.language}</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute right-0 mt-2 w-28 sm:w-32 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity z-50"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              i18n.language === lang.code
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'text-gray-700 dark:text-gray-200'
            }`}
          >
            <span className="text-xl sm:text-2xl">{lang.flag}</span>
            <span className="font-semibold text-xs sm:text-sm">{lang.name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
