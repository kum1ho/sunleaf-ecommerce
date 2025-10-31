import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import PromoCodeInput from '../components/PromoCodeInput';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, total, clearCart } = useCartStore();
  const user = useAuthStore(state => state.user);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  const handleRemove = (productId: string, name: string) => {
    removeItem(productId);
    toast.success(`${name} видалено з кошика`, {
      icon: '🗑️',
      position: 'top-right'
    });
  };

  const deliveryCost = total() >= 500 ? 0 : 50;
  const discount = total() >= 1000 ? total() * 0.1 : 0;
  const finalTotal = total() + deliveryCost - discount - promoDiscount;

  const handlePromoApplied = (discountAmount: number, code: string) => {
    setPromoDiscount(discountAmount);
    setPromoCode(code);
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
          🛒
        </motion.div>
        <h2 className="text-4xl font-bold mb-4">Кошик порожній</h2>
        <p className="text-[var(--text-secondary)] text-lg mb-8">
          Додайте товари до кошика, щоб продовжити покупки
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Кошик</h1>
          <p className="text-[var(--text-secondary)]">
            {items.length} {items.length === 1 ? 'товар' : 'товарів'} на суму {total().toFixed(2)} ₴
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            clearCart();
            toast.success('Кошик очищено');
          }}
          className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Очистити кошик
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map(item => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                className="card flex flex-col sm:flex-row gap-6 group"
              >
                <Link to={`/product/${item.productId}`}>
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
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="font-bold text-lg sm:text-xl mb-2 hover:text-primary-600 transition">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {item.price.toFixed(2)} ₴
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] hover:bg-primary-100 dark:hover:bg-primary-900/30 flex items-center justify-center"
                      >
                        <Minus className="w-5 h-5" />
                      </motion.button>
                      
                      <span className="w-12 text-center text-xl font-bold">
                        {item.quantity}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] hover:bg-primary-100 dark:hover:bg-primary-900/30 flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Remove Button */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <p className="text-lg sm:text-xl md:text-2xl font-bold">
                        {(item.price * item.quantity).toFixed(2)} ₴
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(item.productId, item.name)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card sticky top-6"
          >
            <h2 className="text-2xl font-bold mb-6">Підсумок замовлення</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg">
                <span>Товари ({items.length}):</span>
                <span className="font-semibold">{total().toFixed(2)} ₴</span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Доставка:
                </span>
                <span className={`font-semibold ${deliveryCost === 0 ? 'text-green-600' : ''}`}>
                  {deliveryCost === 0 ? 'Безкоштовно' : `${deliveryCost} ₴`}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-lg text-green-600">
                  <span className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Знижка (10%):
                  </span>
                  <span className="font-semibold">-{discount.toFixed(2)} ₴</span>
                </div>
              )}

              {promoDiscount > 0 && (
                <div className="flex justify-between text-lg text-purple-600 dark:text-purple-400">
                  <span className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Промокод {promoCode}:
                  </span>
                  <span className="font-semibold">-{promoDiscount.toFixed(2)} ₴</span>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">Разом:</span>
                  <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {finalTotal.toFixed(2)} ₴
                  </span>
                </div>
              </div>
            </div>

            {total() < 500 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  💡 Додайте ще {(500 - total()).toFixed(2)} ₴ для безкоштовної доставки!
                </p>
              </div>
            )}

            {/* Promo Code Input */}
            <div className="mb-6">
              <PromoCodeInput 
                totalAmount={total()} 
                onPromoApplied={handlePromoApplied}
              />
            </div>

            {total() >= 500 && total() < 1000 && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800 dark:text-green-200">
                  🎉 Безкоштовна доставка активована!
                </p>
              </div>
            )}

            {total() >= 1000 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  ⭐ Ви отримали знижку 10%!
                </p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-3"
            >
              Оформити замовлення
              <ArrowRight className="w-6 h-6" />
            </motion.button>

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
