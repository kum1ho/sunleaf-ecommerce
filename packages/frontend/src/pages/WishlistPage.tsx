import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore(state => state.addItem);

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      productId: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl
    }, 1);
    toast.success(`${item.name} додано до кошика!`);
  };

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} видалено з улюблених`);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Heart className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
            Список бажань порожній
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
            Додайте товари, які вам сподобались, натиснувши на ❤️
          </p>
          <Link to="/catalog" className="btn btn-primary inline-flex items-center gap-2">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Перейти до каталогу</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
            Список бажань <span className="text-gradient">❤️</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            У вас {items.length} {items.length === 1 ? 'товар' : 'товари'} в списку бажань
          </p>
        </div>
        
        {items.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Очистити весь список бажань?')) {
                clearWishlist();
                toast.success('Список бажань очищено');
              }
            }}
            className="btn btn-secondary"
          >
            <Trash2 className="w-5 h-5" />
            Очистити все
          </button>
        )}
      </div>

      {/* Wishlist Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card-hover group relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.id, item.name)}
                className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <Link to={`/product/${item.id}`}>
                {/* Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-primary">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {item.name}
                </h3>
                
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                  {item.price} ₴
                </p>
              </Link>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(item)}
                className="btn btn-primary w-full"
              >
                <ShoppingCart className="w-5 h-5" />
                До кошика
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Шукаєте щось інше?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Переглянте наш повний каталог екологічних товарів
        </p>
        <Link to="/catalog" className="btn btn-primary">
          <ArrowRight className="w-5 h-5" />
          Переглянути каталог
        </Link>
      </motion.div>
    </div>
  );
}
