import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import PromoCodeInput from '../components/PromoCodeInput';
import { useState } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCartStore();
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  const handlePromoApplied = (discount: number, code: string) => {
    setPromoDiscount(discount);
    setPromoCode(code);
  };

  const finalTotal = Math.max(0, total - promoDiscount);

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
              <ShoppingCart className="w-16 h-16 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Кошик порожній
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Додайте товари до кошика, щоб оформити замовлення
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
            🛒 Кошик
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товари' : 'товарів'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
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
                          <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                            {item.price.toFixed(2)} ₴
                          </p>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="self-start p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                          aria-label="Видалити з кошика"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-11 h-11 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Зменшити кількість"
                          >
                            <Minus className="w-5 h-5" />
                          </motion.button>
                          
                          <span className="w-14 text-center text-lg font-semibold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-11 h-11 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                            aria-label="Збільшити кількість"
                          >
                            <Plus className="w-5 h-5" />
                          </motion.button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Сума</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {(item.price * item.quantity).toFixed(2)} ₴
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Підсумок замовлення
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-gray-300">Товарів:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{items.length}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-gray-300">Сума:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{total.toFixed(2)} ₴</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600 dark:text-gray-300">Знижка ({promoCode}):</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">-{promoDiscount.toFixed(2)} ₴</span>
                  </div>
                )}

                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-gray-300">Доставка:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">Безкоштовно</span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-2xl">
                    <span className="font-bold text-gray-900 dark:text-white">Всього:</span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">
                      {finalTotal.toFixed(2)} ₴
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <PromoCodeInput 
                  totalAmount={total} 
                  onPromoApplied={handlePromoApplied}
                />
              </div>

              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary w-full flex items-center justify-center gap-2 min-h-[52px] text-lg"
                >
                  Оформити замовлення
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link to="/catalog">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-secondary w-full mt-4 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Продовжити покупки
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
