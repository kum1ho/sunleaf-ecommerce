import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { toast } from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlistStore();
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast.success('Додано до кошика!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mb-6 relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 rounded-full flex items-center justify-center">
              <Heart className="w-16 h-16 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Список бажань порожній
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Додайте товари до списку бажань, щоб не загубити їх
          </p>
          <Link to="/catalog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary inline-flex items-center gap-2 min-h-[48px]"
            >
              <ShoppingBag className="w-5 h-5" />
              До каталогу
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
            ❤️ Список бажань
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товари' : 'товарів'}
          </p>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -100 }}
                className="card"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
                      <div className="min-w-0 flex-grow">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 break-words">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {item.description}
                        </p>
                        <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                          {item.price.toFixed(2)} ₴
                        </p>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromWishlist(item.id)}
                        className="self-start p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Видалити зі списку бажань"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-primary flex items-center justify-center gap-2 flex-1 min-h-[48px]"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Додати до кошика
                      </motion.button>
                      
                      <Link to={`/product/${item.id}`} className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn btn-secondary w-full min-h-[48px]"
                        >
                          Переглянути
                        </motion.button>
                      </Link>
                    </div>

                    {/* Stock Info */}
                    {item.stock !== undefined && (
                      <div className="mt-4">
                        <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${
                          item.stock > 10
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : item.stock > 0
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          {item.stock > 0 ? `В наявності: ${item.stock} шт` : 'Немає в наявності'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <Link to="/catalog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary inline-flex items-center gap-2 min-h-[48px]"
            >
              <ShoppingBag className="w-5 h-5" />
              Продовжити покупки
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
