import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Shield, Star, Gift, ArrowRight, Sparkles, Award, Users } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  
  return (
    <div className="space-y-20 -mt-6">
      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950 rounded-3xl p-8"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/20 dark:bg-amber-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-amber-600 dark:text-amber-400 font-semibold text-sm border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-4 h-4" />
              Преміальна якість • Натуральні інгредієнти
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              Відкрий світ справжнього чаю
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Преміальні сорти чаю та кави з усього світу. Насолоджуйтеся неперевершеною якістю та смаком кожного ранку.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500 text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                Переглянути каталог
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </Link>
            
            <Link to="/catalog?category=COFFEE">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all border-2 border-gray-200 dark:border-gray-700 w-full sm:w-auto"
              >
                Новинки сезону
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: '1000+', label: 'Задоволених клієнтів' },
              { value: '50+', label: 'Видів продукції' },
              { value: '4.9', label: 'Середній рейтинг' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Наші категорії</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Оберіть те, що вам до смаку</p>
        </motion.div>        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              name: 'Кава',
              emoji: '☕',
              description: 'Преміальні зерна з усього світу',
              link: '/catalog?category=COFFEE',
              gradient: 'from-amber-500 to-orange-600',
              bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950'
            },
            {
              name: 'Чай',
              emoji: '🍵',
              description: 'Елітні сорти для справжніх цінителів',
              link: '/catalog?category=TEA',
              gradient: 'from-green-500 to-emerald-600',
              bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950'
            },
            {
              name: 'Солодощі',
              emoji: '🍬',
              description: 'Вишукані десерти та делікатеси',
              link: '/catalog?category=SWEETS',
              gradient: 'from-pink-500 to-rose-600',
              bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950'
            }
          ].map((cat) => (
            <Link key={cat.name} to={cat.link}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.bgGradient} p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all cursor-pointer group min-h-[280px] flex flex-col justify-between`}
              >
                <motion.div
                  className="text-7xl sm:text-8xl mb-6"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {cat.emoji}
                </motion.div>
                
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white">{cat.name}</h3>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">{cat.description}</p>
                  
                  <motion.div
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${cat.gradient} text-white rounded-xl font-semibold shadow-lg`}
                    whileHover={{ gap: '12px' }}
                  >
                    Переглянути
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Чому обирають нас</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Ваша задоволеність - наш пріоритет</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              icon: Truck,
              title: 'Швидка доставка',
              description: 'Безкоштовно від 500 ₴',
              color: 'text-blue-600 dark:text-blue-400',
              bgColor: 'bg-blue-50 dark:bg-blue-950'
            },
            {
              icon: Shield,
              title: 'Гарантія якості',
              description: '100% оригінальна продукція',
              color: 'text-green-600 dark:text-green-400',
              bgColor: 'bg-green-50 dark:bg-green-950'
            },
            {
              icon: Gift,
              title: 'Бонусна програма',
              description: 'Кешбек та знижки',
              color: 'text-purple-600 dark:text-purple-400',
              bgColor: 'bg-purple-50 dark:bg-purple-950'
            },
            {
              icon: Award,
              title: 'Підтримка 24/7',
              description: 'Завжди на звязку',
              color: 'text-orange-600 dark:text-orange-400',
              bgColor: 'bg-orange-50 dark:bg-orange-950'
            }
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className={`${feature.bgColor} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}>
                <feature.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Відгуки клієнтів</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Що кажуть про нас</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              name: 'Олена К.',
              text: 'Чудова кава! Замовляю вже 3 місяці поспіль. Смак неперевершений, а доставка завжди вчасно.',
              rating: 5,
              avatar: '👩'
            },
            {
              name: 'Дмитро П.',
              text: 'Відмінний вибір чаю. Особливо сподобався зелений чай Сенча. Рекомендую всім!',
              rating: 5,
              avatar: '👨'
            },
            {
              name: 'Марія В.',
              text: 'Солодощі просто неймовірні! Якість на висоті, все свіже. Дякую за турботу про клієнтів!',
              rating: 5,
              avatar: '👩‍🦰'
            }
          ].map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl sm:text-5xl">{review.avatar}</div>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">{review.name}</h4>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 dark:from-amber-700 dark:via-orange-700 dark:to-red-700 rounded-3xl p-8 sm:p-16 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="text-5xl sm:text-6xl mb-6">🎁</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">Спеціальна пропозиція!</h2>
            <p className="text-lg sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Знижка 15% на перше замовлення. Використайте промокод: <span className="font-bold bg-white/20 px-4 py-2 rounded-lg">WELCOME15</span>
            </p>
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-amber-600 rounded-2xl font-bold text-base sm:text-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                Приєднатись зараз
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
