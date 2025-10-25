import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, Phone, User, Check, ShoppingBag, Truck, Package } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const token = useAuthStore(state => state.token);

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    shippingAddress: '',
    shippingCity: '',
    shippingZip: '',
    phone: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);

  const deliveryCost = total() >= 500 ? 0 : 50;
  const discount = total() >= 1000 ? total() * 0.1 : 0;
  const finalTotal = total() + deliveryCost - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
          ...form
        })
      });

      if (!res.ok) throw new Error('Order failed');

      toast.success('Замовлення успішно оформлено!', {
        icon: '✅',
        duration: 4000
      });
      
      clearCart();
      setTimeout(() => navigate('/orders'), 2000);
    } catch (err) {
      toast.error('Помилка при оформленні замовлення. Спробуйте ще раз.', {
        icon: '❌'
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const steps = [
    { number: 1, title: 'Контактні дані', icon: User },
    { number: 2, title: 'Доставка', icon: Truck },
    { number: 3, title: 'Підтвердження', icon: Check }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster />
      
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Оформлення замовлення
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Заповніть дані для доставки вашого замовлення
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: currentStep >= step.number ? 1 : 0.8 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <step.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.div>
                <span className={`text-xs sm:text-sm font-semibold text-center ${
                  currentStep >= step.number
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
              
              {idx < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 rounded ${
                  currentStep > step.number
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Contact Info */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                  <User className="w-7 h-7 text-amber-600" />
                  Контактна інформація
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Ім'я *</label>
                    <input
                      type="text"
                      className="input"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="Іван"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Прізвище *</label>
                    <input
                      type="text"
                      className="input"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Петренко"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 font-semibold mb-2 text-gray-900 dark:text-white">
                    <Phone className="w-4 h-4" />
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    className="input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+380 XX XXX XX XX"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Email</label>
                  <input
                    type="email"
                    className="input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@mail.com"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-primary w-full py-4"
                >
                  Далі
                </button>
              </motion.div>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-amber-600" />
                  Адреса доставки
                </h2>

                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Місто *</label>
                  <input
                    type="text"
                    className="input"
                    value={form.shippingCity}
                    onChange={(e) => setForm({ ...form, shippingCity: e.target.value })}
                    placeholder="Київ"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Адреса *</label>
                  <input
                    type="text"
                    className="input"
                    value={form.shippingAddress}
                    onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
                    placeholder="вул. Хрещатик, 1, кв. 10"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Поштовий індекс *</label>
                  <input
                    type="text"
                    className="input"
                    value={form.shippingZip}
                    onChange={(e) => setForm({ ...form, shippingZip: e.target.value })}
                    placeholder="01001"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="btn btn-secondary flex-1 py-4"
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="btn btn-primary flex-1 py-4"
                  >
                    Далі
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                  <Check className="w-7 h-7 text-green-600" />
                  Підтвердження замовлення
                </h2>

                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Ім'я:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Телефон:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{form.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Адреса:</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-right">
                      {form.shippingCity}, {form.shippingAddress}, {form.shippingZip}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn btn-secondary flex-1 py-4"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-1 py-4 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Обробка...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Підтвердити замовлення
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card sticky top-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <ShoppingBag className="w-7 h-7 text-amber-600" />
              Ваше замовлення
            </h2>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {items.map(item => (
                <div key={item.productId} className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Кількість: {item.quantity}</p>
                    <p className="text-amber-600 dark:text-amber-400 font-bold">
                      {(item.price * item.quantity).toFixed(2)} ₴
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Товари ({items.length}):</span>
                <span className="font-semibold">{total().toFixed(2)} ₴</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Доставка:
                </span>
                <span className={`font-semibold ${deliveryCost === 0 ? 'text-green-600' : ''}`}>
                  {deliveryCost === 0 ? 'Безкоштовно' : `${deliveryCost} ₴`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Знижка (10%):</span>
                  <span className="font-semibold">-{discount.toFixed(2)} ₴</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Разом:</span>
              <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {finalTotal.toFixed(2)} ₴
              </span>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Ваше замовлення буде доставлено протягом 1-3 робочих днів
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
