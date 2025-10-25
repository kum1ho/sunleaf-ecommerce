import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Check } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore(state => state.register);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { met: form.password.length >= 6, text: 'Мінімум 6 символів' },
    { met: /[A-Z]/.test(form.password) || /[А-Я]/.test(form.password), text: 'Містить велику літеру' },
    { met: /[0-9]/.test(form.password), text: 'Містить цифру' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Паролі не співпадають', { icon: '❌' });
      return;
    }

    if (form.password.length < 6) {
      toast.error('Пароль має містити мінімум 6 символів', { icon: '❌' });
      return;
    }

    setLoading(true);

    try {
      await register(form.name, form.email, form.password);
      toast.success('Реєстрація успішна! Вхід виконано.', {
        icon: '✅',
        duration: 2000
      });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      toast.error('Помилка реєстрації. Спробуйте інший email.', {
        icon: '❌'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Toaster />
      
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-3xl mb-6 shadow-lg"
            >
              <span className="text-4xl">🍃</span>
            </motion.div>
            
            <h1 className="text-4xl font-display font-bold mb-3 text-gray-900 dark:text-white">
              Створити акаунт
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Приєднуйтесь до Sunleaf сьогодні
            </p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-900 dark:text-white">
                  <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  Повне ім'я
                </label>
                <input
                  type="text"
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Іван Петренко"
                  required
                  autoComplete="name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-900 dark:text-white">
                  <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  Email адреса
                </label>
                <input
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-900 dark:text-white">
                  <Lock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  Пароль
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input pr-12"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {form.password && (
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-xs transition-colors ${
                          req.met
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 ${
                            req.met ? 'opacity-100' : 'opacity-30'
                          }`}
                        />
                        {req.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="flex items-center gap-2 font-semibold mb-2 text-gray-900 dark:text-white">
                  <Lock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  Підтвердіть пароль
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                {form.confirmPassword && (
                  <p
                    className={`mt-2 text-xs flex items-center gap-1.5 ${
                      form.password === form.confirmPassword
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {form.password === form.confirmPassword ? (
                      <>
                        <Check className="w-4 h-4" />
                        Паролі співпадають
                      </>
                    ) : (
                      'Паролі не співпадають'
                    )}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Я погоджуюсь з{' '}
                    <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">
                      Умовами використання
                    </a>
                    {' '}та{' '}
                    <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">
                      Політикою конфіденційності
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-4 text-lg mt-6"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Реєстрація...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <UserPlus className="w-5 h-5" />
                    Зареєструватись
                  </div>
                )}
              </motion.button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Вже є акаунт?{' '}
                <Link
                  to="/login"
                  className="font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  Увійти
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors inline-flex items-center gap-2"
            >
              ← Повернутись на головну
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
