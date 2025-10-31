import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import toast, { Toaster } from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      productId: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl
    }, 1);
    toast.success(`${item.name} додано до кошика!`, {
      icon: '🛒',
      position: 'top-right'
    });
  };

  const handleRemove = (id: string, name: string) => {
    removeFromWishlist(id);
    toast.success(`${name} видалено зі списку бажань`, {
      icon: '💔',
      position: 'top-right'
    });
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-8xl mb-6"
        >
          ❤️
        </motion.div>
        <h2 className="text-4xl font-bold mb-4">Список бажань порожній</h2>
        <p className="text-[var(--text-secondary)] text-lg mb-8">
          Додайте товари до списку бажань, щоб не загубити їх
        </p>
        <Link to="/catalog">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary text-lg px-8 flex items-center gap-3 mx-auto"
          >
            <ShoppingBag className="w-6 h-6" />
            Перейти до каталогу
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <Toaster />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">❤️ Список бажань</h1>
          <p className="text-[var(--text-secondary)]">
            {items.length} {items.length === 1 ? 'товар' : 'товарів'}
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            clearWishlist();
            toast.success('Список бажань очищено');
          }}
          className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Очистити список
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Wishlist Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                className="card flex flex-col sm:flex-row gap-6 group"
              >
                <Link to={`/product/${item.id}`}>
                  <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-bold text-lg sm:text-xl mb-2 hover:text-primary-600 transition">
                        {item.name}
                      </h3>
                    </Link>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {item.description}
                      </p>
                    )}
                    <p className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {item.price.toFixed(2)} ₴
                    </p>
                    
                    {/* Stock Badge */}
                    {item.stock !== undefined && (
                      <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
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

                  <div className="flex items-center justify-between mt-4">
                    {/* Action Buttons */}
                    <div className="flex gap-3 flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-primary flex items-center justify-center gap-2 flex-1"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        До кошика
                      </motion.button>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 ml-4"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Wishlist Summary */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card sticky top-6"
          >
            <h2 className="text-2xl font-bold mb-6">Підсумок</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg">
                <span>Товарів:</span>
                <span className="font-semibold">{items.length}</span>
              </div>

              <div className="flex justify-between text-lg">
                <span>Загальна вартість:</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {items.reduce((sum, item) => sum + item.price, 0).toFixed(2)} ₴
                </span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                💡 Додайте товари до кошика для оформлення замовлення
              </p>
            </div>

            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-secondary w-full mt-3 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Продовжити покупки
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
