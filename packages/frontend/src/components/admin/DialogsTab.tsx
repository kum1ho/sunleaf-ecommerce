import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User, Bot, Clock } from 'lucide-react';

// Поки що mock data - пізніше підключимо до бази
const MOCK_DIALOGS = [
  {
    id: '1',
    user: { name: 'Олена Іванова', email: 'olena@example.com' },
    messages: [
      { role: 'user', content: 'Як оформити замовлення?', timestamp: new Date(2024, 9, 25, 10, 30) },
      { role: 'assistant', content: 'Привіт! 👋 Щоб оформити замовлення: 1) Додайте товари до кошика 2) Перейдіть до кошика 3) Натисніть "Оформити замовлення" 4) Заповніть дані доставки', timestamp: new Date(2024, 9, 25, 10, 31) },
      { role: 'user', content: 'Скільки коштує доставка?', timestamp: new Date(2024, 9, 25, 10, 32) },
      { role: 'assistant', content: 'Доставка безкоштовна при замовленні від 1000₴. Якщо сума менша - доставка коштує 80₴ 📦', timestamp: new Date(2024, 9, 25, 10, 32) }
    ],
    lastMessage: new Date(2024, 9, 25, 10, 32)
  },
  {
    id: '2',
    user: { name: 'Андрій Петров', email: 'andriy@example.com' },
    messages: [
      { role: 'user', content: 'Чи є у вас органічна кава?', timestamp: new Date(2024, 9, 25, 9, 15) },
      { role: 'assistant', content: 'Так! У нас є органічна кава Арабіка за 350₴. Вона має насичений смак та аромат ☕', timestamp: new Date(2024, 9, 25, 9, 16) }
    ],
    lastMessage: new Date(2024, 9, 25, 9, 16)
  }
];

export default function DialogsTab() {
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);

  const currentDialog = MOCK_DIALOGS.find(d => d.id === selectedDialog);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Dialogs List */}
      <div className="lg:col-span-1 space-y-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Діалоги клієнтів
        </h2>

        {MOCK_DIALOGS.map((dialog) => (
          <motion.button
            key={dialog.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedDialog(dialog.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedDialog === dialog.id
                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {dialog.user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {dialog.messages[dialog.messages.length - 1].content}
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-500">
                  <Clock className="w-3 h-3" />
                  {dialog.lastMessage.toLocaleTimeString('uk-UA', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </motion.button>
        ))}

        {MOCK_DIALOGS.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Немає діалогів</p>
          </div>
        )}
      </div>

      {/* Dialog Messages */}
      <div className="lg:col-span-2">
        {currentDialog ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            {/* Dialog Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {currentDialog.user.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentDialog.user.email}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {currentDialog.messages.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[80%]">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      <p className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-right text-gray-500' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('uk-UA', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                💡 Це історія розмов клієнта з AI-асистентом SunBot
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Оберіть діалог для перегляду
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
