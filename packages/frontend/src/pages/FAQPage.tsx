import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Package, CreditCard, Truck, RefreshCw, Leaf, MessageCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Всі питання', icon: MessageCircle },
    { id: 'delivery', label: 'Доставка', icon: Truck },
    { id: 'payment', label: 'Оплата', icon: CreditCard },
    { id: 'products', label: 'Товари', icon: Leaf },
    { id: 'returns', label: 'Повернення', icon: RefreshCw },
    { id: 'orders', label: 'Замовлення', icon: Package }
  ];

  const faqs: FAQ[] = [
    {
      category: 'delivery',
      question: 'Скільки коштує доставка?',
      answer: '🚚 Доставка **безкоштовна** при замовленні від 1000₴. При сумі менше 1000₴ вартість доставки складає 80₴. Ми відправляємо замовлення Новою Поштою та Укрпоштою по всій Україні.'
    },
    {
      category: 'delivery',
      question: 'Скільки часу займає доставка?',
      answer: '⏰ Зазвичай доставка займає **2-5 робочих днів** залежно від регіону:\n\n• Київ та область - 1-2 дні\n• Великі міста - 2-3 дні\n• Інші населені пункти - 3-5 днів\n\nПісля відправки ви отримаєте трек-номер для відстеження.'
    },
    {
      category: 'delivery',
      question: 'Які способи доставки доступні?',
      answer: '📦 Ми пропонуємо:\n\n• **Нова Пошта** - відділення або адресна доставка\n• **Укрпошта** - поштові відділення\n• **Кур\'єр по Києву** - доставка додому (від 1500₴)\n\nВи можете обрати зручний спосіб при оформленні замовлення.'
    },
    {
      category: 'payment',
      question: 'Які способи оплати ви приймаєте?',
      answer: '💳 Ми приймаємо:\n\n**Онлайн оплата:**\n• Visa, Mastercard\n• Apple Pay, Google Pay\n• Безпечний платіжний шлюз\n\n**При отриманні:**\n• Готівка\n• Картка через термінал\n\nОбирайте зручний спосіб!'
    },
    {
      category: 'payment',
      question: 'Чи безпечно платити онлайн?',
      answer: '🔒 Так, **абсолютно безпечно**! Ми використовуємо сертифікований платіжний шлюз з шифруванням даних. Ваша фінансова інформація не зберігається на наших серверах і захищена міжнародними стандартами безпеки PCI DSS.'
    },
    {
      category: 'payment',
      question: 'Чи можна оплатити частинами?',
      answer: '📊 На даний момент ми не підтримуємо розстрочку, але плануємо додати цю опцію найближчим часом. Слідкуйте за новинами!'
    },
    {
      category: 'products',
      question: 'Чи всі товари натуральні?',
      answer: '🌿 Так! **100% наших товарів - натуральні**. Ми ретельно перевіряємо кожного постачальника, вимагаємо сертифікати та особисто тестуємо продукцію. Без хімії, парабенів та штучних барвників.'
    },
    {
      category: 'products',
      question: 'Звідки походять ваші товари?',
      answer: '🌍 Ми працюємо з **перевіреними постачальниками**:\n\n• Органічні ферми України\n• Сертифіковані плантації Азії та Африки\n• Майстри ручної роботи\n\nВся продукція має документи про походження та якість.'
    },
    {
      category: 'products',
      question: 'Як зберігати чай та каву?',
      answer: '☕ Поради по зберіганню:\n\n**Чай:**\n• Щільно закрита упаковка\n• Темне місце\n• Температура 18-25°C\n• Вдалі від продуктів з різким запахом\n\n**Кава:**\n• Герметичний контейнер\n• Прохолодне місце\n• Подалі від світла\n• Не в холодильнику!'
    },
    {
      category: 'products',
      question: 'Чи є термін придатності у натуральної косметики?',
      answer: '🧴 Так, натуральна косметика має термін придатності **6-12 місяців** після відкриття. Завжди перевіряйте дату виробництва на упаковці. Ми продаємо тільки свіжу продукцію!'
    },
    {
      category: 'returns',
      question: 'Як повернути товар?',
      answer: '🔄 Повернення протягом **14 днів**:\n\n1. Напишіть нам на email або в чат\n2. Вкажіть номер замовлення та причину\n3. Поверніть товар в оригінальній упаковці\n4. Ми повернемо гроші протягом 5-7 днів\n\n**Умови:** товар не використовувався, збережені всі етикетки.'
    },
    {
      category: 'returns',
      question: 'Хто оплачує зворотню доставку?',
      answer: '💰 **Якщо товар неякісний** - ми оплачуємо повернення.\n\n**Якщо просто передумали** - вартість зворотної доставки компенсується з суми повернення.\n\nВ будь-якому випадку, ми знайдемо найкраще рішення!'
    },
    {
      category: 'returns',
      question: 'Чи можна обміняти товар?',
      answer: '🔁 Так! Якщо товар не підійшов, ви можете **обміняти його** на інший протягом 14 днів. Напишіть нам, і ми організуємо обмін швидко та зручно.'
    },
    {
      category: 'orders',
      question: 'Як оформити замовлення?',
      answer: '🛒 Просто:\n\n1. Додайте товари до кошика\n2. Перейдіть до оформлення\n3. Заповніть дані доставки\n4. Оберіть спосіб оплати\n5. Підтвердіть замовлення\n\nГотово! Ви отримаєте email з деталями.'
    },
    {
      category: 'orders',
      question: 'Чи можна змінити замовлення після оформлення?',
      answer: '✏️ Так, якщо замовлення ще **не відправлене**. Зв\'яжіться з нами якомога швидше через чат або телефон, і ми внесемо зміни.'
    },
    {
      category: 'orders',
      question: 'Як відстежити моє замовлення?',
      answer: '📍 Після відправки ви отримаєте:\n\n• Email з трек-номером\n• SMS підтвердження\n• Посилання для відстеження\n\nТакож можете перевірити статус в розділі "Мої замовлення" в особистому кабінеті.'
    },
    {
      category: 'orders',
      question: 'Чи можна замовити без реєстрації?',
      answer: '👤 Так, можна оформити замовлення **як гість**. Але з реєстрацією зручніше:\n\n• Швидше оформлення\n• Історія замовлень\n• Список бажань\n• Спеціальні пропозиції'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
          <MessageCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
            Часті питання
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Як ми можемо <span className="text-gradient">допомогти</span>?
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Знайдіть відповіді на найпопулярніші питання або зв'яжіться з нами через чат
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Шукайте відповіді..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-14"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <category.icon className="w-5 h-5" />
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto space-y-4"
      >
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Не знайдено питань за вашим запитом
            </p>
          </div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-primary-600 dark:text-primary-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="prose dark:prose-invert prose-primary max-w-none">
                        {faq.answer.split('\n').map((line, i) => (
                          <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                            {line.split('**').map((part, j) => 
                              j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Не знайшли відповідь?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Наша команда підтримки завжди готова допомогти!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary">
            <MessageCircle className="w-5 h-5" />
            Написати в чат
          </button>
          <a href="mailto:support@sunleaf.com.ua" className="btn btn-secondary">
            Написати Email
          </a>
        </div>
      </motion.div>
    </div>
  );
}
