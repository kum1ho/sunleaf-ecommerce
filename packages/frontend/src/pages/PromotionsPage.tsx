import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, TrendingDown, Sparkles, Gift, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  type: 'PERCENTAGE' | 'FIXED' | 'SPECIAL';
  endsAt: Date;
  image: string;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  }>;
}

export default function PromotionsPage() {
  const [timeLeft, setTimeLeft] = useState<Record<string, any>>({});

  // Mock promotions data
  const promotions: Promotion[] = [
    {
      id: '1',
      title: 'FLASH SALE - Зелений чай матча',
      description: 'Обмежена пропозиція! Преміальна японська матча зі знижкою 40%',
      discount: 40,
      type: 'PERCENTAGE',
      endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 дні
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
      products: [
        {
          id: '1',
          name: 'Зелений чай матча',
          price: 250,
          imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300'
        }
      ]
    },
    {
      id: '2',
      title: '🎁 Набір "Ранкова свіжість"',
      description: 'Купуйте кавунабір з 3 сортів кави та отримайте чашку в подарунок!',
      discount: 0,
      type: 'SPECIAL',
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 днів
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'
    },
    {
      id: '3',
      title: 'Друга свічка -50%',
      description: 'При купівлі двох ароматичних свічок - друга зі знижкою 50%',
      discount: 50,
      type: 'PERCENTAGE',
      endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 днів
      image: 'https://images.unsplash.com/photo-1602874801006-3b3f2d60e056?w=800'
    },
    {
      id: '4',
      title: '⚡ Товар тижня: Органічне мило',
      description: 'Спеціальна ціна тільки цього тижня - купуйте зі знижкою 35%',
      discount: 35,
      type: 'PERCENTAGE',
      endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 дні
      image: 'https://images.unsplash.com/photo-1600428043983-03d23f67040b?w=800'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: Record<string, any> = {};
      
      promotions.forEach(promo => {
        const diff = promo.endsAt.getTime() - Date.now();
        if (diff > 0) {
          newTimeLeft[promo.id] = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60)
          };
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getDiscountBadge = (promo: Promotion) => {
    if (promo.type === 'SPECIAL') {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-sm">
          <Gift className="w-4 h-4" />
          СПЕЦПРОПОЗИЦІЯ
        </div>
      );
    }
    
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-bold text-xl">
        <TrendingDown className="w-5 h-5" />
        -{promo.discount}%
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 dark:bg-red-900/30 rounded-full">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
          <span className="text-xs sm:text-sm font-semibold text-red-700 dark:text-red-300">
            Гарячі пропозиції
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
          Акції та <span className="text-gradient">Спецпропозиції</span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Не пропустіть унікальні пропозиції! Обмежена кількість та час дії
        </p>
      </motion.div>

      {/* Main Promotion (First one - biggest) */}
      {promotions[0] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0">
            <img
              src={promotions[0].image}
              alt={promotions[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
          
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-12 min-h-[300px] sm:min-h-[400px] flex flex-col justify-center">
            <div className="max-w-2xl">
              {getDiscountBadge(promotions[0])}
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 sm:mt-6 mb-3 sm:mb-4">
                {promotions[0].title}
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8">
                {promotions[0].description}
              </p>

              {/* Timer */}
              {timeLeft[promotions[0].id] && (
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                  {[
                    { label: 'Днів', value: timeLeft[promotions[0].id].days },
                    { label: 'Годин', value: timeLeft[promotions[0].id].hours },
                    { label: 'Хвилин', value: timeLeft[promotions[0].id].minutes },
                    { label: 'Секунд', value: timeLeft[promotions[0].id].seconds }
                  ].map((unit, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 min-w-[60px] sm:min-w-[70px] md:min-w-[80px] text-center"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-300 uppercase">{unit.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <Link to="/catalog" className="btn btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Перейти до товару</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Other Promotions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.slice(1).map((promo, idx) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (idx + 1) }}
            className="card-hover overflow-hidden relative group"
          >
            {/* Image */}
            <div className="relative h-48 -m-6 mb-6">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-4 right-4">
                {getDiscountBadge(promo)}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {promo.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {promo.description}
            </p>

            {/* Mini Timer */}
            {timeLeft[promo.id] && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Clock className="w-4 h-4" />
                Залишилось: {timeLeft[promo.id].days}д {timeLeft[promo.id].hours}г {timeLeft[promo.id].minutes}хв
              </div>
            )}

            <Link
              to="/catalog"
              className="btn btn-secondary w-full group-hover:btn-primary transition-all"
            >
              Переглянути
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 text-center"
      >
        <Tag className="w-16 h-16 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Не пропускайте акції!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Підпишіться на розсилку та отримуйте ексклюзивні пропозиції, промокоди та інформацію про нові акції першими
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Ваш email"
            className="input flex-1"
          />
          <button type="submit" className="btn btn-primary whitespace-nowrap">
            Підписатись
          </button>
        </form>
      </motion.div>
    </div>
  );
}
