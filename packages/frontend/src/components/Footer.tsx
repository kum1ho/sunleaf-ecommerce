import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl">🍃</span>
              <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                Sunleaf
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4">
              Преміальна кава, елітний чай та вишукані солодощі для вашої насолоди. Якість, що надихає!
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 dark:text-sky-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900 dark:text-white">Навігація</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: '/', label: 'Головна' },
                { to: '/catalog', label: 'Каталог' },
                { to: '/catalog?category=COFFEE', label: 'Кава' },
                { to: '/catalog?category=TEA', label: 'Чай' },
                { to: '/catalog?category=SWEETS', label: 'Солодощі' }
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900 dark:text-white">Підтримка</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: '/about', label: 'Про нас' },
                { to: '/faq', label: 'FAQ' },
                { to: '/orders', label: 'Мої замовлення' },
                { to: '/cart', label: 'Кошик' }
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-600 dark:bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900 dark:text-white">Контакти</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  м. Київ, вул. Хрещатик, 1
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <a
                  href="tel:+380000000000"
                  className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  +380 00 000 00 00
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <a
                  href="mailto:info@sunleaf.com"
                  className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  info@sunleaf.com
                </a>
              </li>
            </ul>
            
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl">
              <p className="text-[10px] sm:text-xs text-amber-800 dark:text-amber-200 font-semibold mb-1">
                📞 Цілодобова підтримка
              </p>
              <p className="text-[10px] sm:text-xs text-amber-700 dark:text-amber-300">
                Ми завжди готові допомогти!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Sunleaf. Всі права захищені.
            </p>
            
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              Зроблено з <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500 animate-pulse" /> в Україні
            </p>

            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Політика конфіденційності
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Умови використання
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
