import { motion } from 'framer-motion';
import { Leaf, Heart, Award, Users, MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Екологічність',
      description: 'Ми обираємо тільки натуральні та екологічно чисті товари, дбаючи про планету'
    },
    {
      icon: Heart,
      title: 'Якість',
      description: 'Кожен товар проходить суворий відбір та має всі необхідні сертифікати'
    },
    {
      icon: Award,
      title: 'Чесність',
      description: 'Прозорість у всьому - від походження товарів до ціноутворення'
    },
    {
      icon: Users,
      title: 'Спільнота',
      description: 'Ми створюємо спільноту людей, які дбають про здоров\'я та довкілля'
    }
  ];

  const team = [
    {
      name: 'Олена Сонечко',
      role: 'Засновниця',
      image: 'https://i.pravatar.cc/300?img=1',
      bio: 'Еко-активістка з 10-річним досвідом'
    },
    {
      name: 'Андрій Зелений',
      role: 'Head of Products',
      image: 'https://i.pravatar.cc/300?img=12',
      bio: 'Експерт з органічних товарів'
    },
    {
      name: 'Марія Квітка',
      role: 'Customer Care',
      image: 'https://i.pravatar.cc/300?img=5',
      bio: 'Завжди готова допомогти клієнтам'
    }
  ];

  const stats = [
    { value: '5000+', label: 'Задоволених клієнтів' },
    { value: '50+', label: 'Еко-партнерів' },
    { value: '100%', label: 'Натуральні товари' },
    { value: '3 роки', label: 'На ринку' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
          <Leaf className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
            Натурально • Екологічно • Свідомо
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Про <span className="text-gradient">Sunleaf</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Ми — команда ентузіастів, які вірять, що кожна людина заслуговує на якісні, 
          натуральні продукти без шкоди для планети. З 2022 року ми допомагаємо українцям 
          робити свідомий вибір на користь здоров'я та екології.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="card text-center"
          >
            <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Our Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Наша історія 📖
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Sunleaf народився з простої ідеї: створити місце, де кожен зможе знайти 
            якісні натуральні товари без переплат та маркетингових трюків.
          </p>
          <p>
            У 2022 році ми почали з невеликої колекції органічних чаїв та кави. 
            Сьогодні наш асортимент включає понад 100 найменувань: від натуральної 
            косметики до еко-товарів для дому.
          </p>
          <p>
            Ми працюємо напряму з виробниками, відвідуємо плантації, перевіряємо 
            сертифікати та обираємо тільки те, що купили б собі та своїм близьким.
          </p>
        </div>
      </motion.div>

      {/* Values */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Наші цінності 🌟
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="card-hover text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Наша команда 👥
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="card-hover text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary-200 dark:border-primary-800"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Зв'яжіться з нами 📞
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Адреса</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  вул. Екологічна, 15<br />
                  Київ, Україна 01001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  hello@sunleaf.com.ua<br />
                  support@sunleaf.com.ua
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Телефон</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  +380 (44) 123-45-67<br />
                  +380 (93) 123-45-67
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Графік роботи</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Пн-Пт: 9:00 - 18:00<br />
                  Сб-Нд: 10:00 - 16:00
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.1771750352847!2d30.51926831573225!3d50.45046597947488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50b465b53f%3A0x61ab40fd6e372f39!2z0KPQutGA0LDRl9C90LAsINCa0LjRl9Cy!5e0!3m2!1suk!2sua!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sunleaf location"
            />
          </div>
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Сертифікати та нагороди 🏆
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Наша якість підтверджена міжнародними та національними сертифікатами
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {['🌿 Organic', '✅ ISO 9001', '🌍 EcoCert', '💚 Cruelty Free'].map((cert, idx) => (
            <div
              key={idx}
              className="px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-primary-200 dark:border-primary-800 font-semibold text-gray-900 dark:text-white"
            >
              {cert}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
