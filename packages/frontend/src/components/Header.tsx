import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, LogOut, Menu, X, Coffee, Sparkles, BookOpen, Truck, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { user, logout } = useAuthStore();
  const items = useCartStore(state => state.items);
  const wishlistItems = useWishlistStore(state => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-7xl">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl"
            >
              🍃
            </motion.div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              Sunleaf
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/catalog"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors flex items-center gap-2"
            >
              <Coffee className="w-5 h-5" />
              Каталог
            </Link>
            <Link
              to="/promotions"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Акції
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Блог
            </Link>
            <Link
              to="/delivery"
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors flex items-center gap-2"
            >
              <Truck className="w-5 h-5" />
              Доставка
            </Link>
            {user && (
              <Link
                to="/orders"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors"
              >
                Мої замовлення
              </Link>
            )}
            {user?.role === 'ADMIN' && (
              <Link
                to="/admin"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors"
              >
                Адмін панель
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <Link to="/wishlist" className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
                aria-label="Список бажань"
              >
                <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                {wishlistItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            <Link to="/cart" className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                aria-label="Кошик"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Вийти
                </motion.button>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <User className="w-5 h-5" />
                  Увійти
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />

            <Link to="/wishlist" className="relative p-1.5 sm:p-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative p-1.5 sm:p-2">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-col gap-3">
                <Link
                  to="/catalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
                >
                  <Coffee className="w-5 h-5" />
                  Каталог
                </Link>
                
                <Link
                  to="/promotions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Акції
                </Link>
                
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Блог
                </Link>
                
                <Link
                  to="/delivery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
                >
                  <Truck className="w-5 h-5" />
                  Доставка
                </Link>
                
                {user && (
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
                  >
                    Мої замовлення
                  </Link>
                )}
                
                {user?.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
                  >
                    Адмін панель
                  </Link>
                )}

                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-semibold"
                      >
                        <LogOut className="w-5 h-5" />
                        Вийти
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold"
                    >
                      <User className="w-5 h-5" />
                      Увійти
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
