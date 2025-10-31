import { motion } from 'framer-motion';
import { Truck, Package, Clock, MapPin, CreditCard, Wallet, Smartphone, DollarSign, CheckCircle } from 'lucide-react';

export default function DeliveryPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
          <Truck className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">
            Швидка доставка по всій Україні
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Доставка та <span className="text-gradient">Оплата</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Зручні способи доставки та оплати для вашого комфорту
        </p>
      </motion.div>

      {/* Delivery Methods */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Способи доставки
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Truck,
              title: 'Нова Пошта',
              time: '1-3 дні',
              price: 'від 50 ₴',
              description: 'Доставка у відділення або поштомат',
              features: [
                'Понад 10,000 відділень',
                'Безкоштовно від 1000 ₴',
                'Можливість примірки'
              ]
            },
            {
              icon: Package,
              title: 'Укрпошта',
              time: '2-5 днів',
              price: 'від 35 ₴',
              description: 'Економна доставка по Україні',
              features: [
                'Найнижча ціна',
                'Доставка в село',
                'Накладений платіж'
              ]
            },
            {
              icon: MapPin,
              title: 'Кур\'єр по Києву',
              time: '1 день',
              price: '80 ₴',
              description: 'Доставка до дверей в межах міста',
              features: [
                'Зручний час доставки',
                'Безкоштовно від 1500 ₴',
                'Оплата при отриманні'
              ]
            }
          ].map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="card-hover"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl mb-4">
                <method.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {method.title}
              </h3>
              
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  {method.time}
                </div>
                <div className="font-bold text-primary-600 dark:text-primary-400">
                  {method.price}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {method.description}
              </p>
              
              <ul className="space-y-2">
                {method.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Способи оплати
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: CreditCard,
              title: 'Оплата карткою онлайн',
              description: 'Visa, Mastercard - безпечна оплата через платіжний шлюз',
              badge: 'Популярне',
              badgeColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            },
            {
              icon: Wallet,
              title: 'Накладений платіж',
              description: 'Оплата при отриманні в відділенні Нової Пошти або Укрпошти',
              badge: 'Без ризику',
              badgeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            },
            {
              icon: Smartphone,
              title: 'Apple Pay / Google Pay',
              description: 'Миттєва оплата через мобільний телефон',
              badge: 'Швидко',
              badgeColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
            },
            {
              icon: DollarSign,
              title: 'Безготівковий розрахунок',
              description: 'Для юридичних осіб - рахунок-фактура та договір',
              badge: 'Для бізнесу',
              badgeColor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
            }
          ].map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl">
                  <method.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${method.badgeColor}`}>
                  {method.badge}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {method.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Conditions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Умови доставки
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              🎁 Безкоштовна доставка
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>При замовленні від 1000 ₴ Новою Поштою</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>При замовленні від 1500 ₴ кур'єром по Києву</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              📦 Відправка замовлення
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Замовлення до 14:00 - відправка в той же день</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Замовлення після 14:00 - відправка наступного дня</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              🔄 Повернення та обмін
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>14 днів на повернення товару</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Повернення коштів протягом 5 робочих днів</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              📞 Підтримка
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Telegram-бот для відстеження замовлення</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Консультація менеджера: +380 (67) 123-45-67</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
