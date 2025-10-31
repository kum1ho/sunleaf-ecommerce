import express from 'express';

const router = express.Router();

const OPENROUTER_API_KEY = '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';
const MODEL = 'openrouter/auto';
const USE_FALLBACK = true; // Використовувати fallback замість API (поки немає кредитів)

// System prompt для AI асістента
const SYSTEM_PROMPT = `Ти - SunBot, дружній AI-асистент магазину Sunleaf, який продає натуральні та екологічні товари.

Інформація про магазин:
- Назва: Sunleaf (Санліф)
- Спеціалізація: Натуральні екологічні товари (чаї, кава, косметика, декор)
- Доставка: 2-5 робочих днів по Україні
- Вартість доставки: Безкоштовна від 1000₴, інакше 80₴
- Способи оплати: Карткою онлайн, готівкою/карткою при отриманні
- Повернення: 14 днів з моменту отримання

Популярні товари:
1. Зелений чай матча (250₴)
2. Органічна кава Арабіка (350₴)
3. Натуральне мило ручної роботи (120₴)
4. Ароматична свічка з соєвого воску (180₴)
5. Еко-сумка бавовняна (150₴)
6. Бамбукова зубна щітка (85₴)

Твої завдання:
- Відповідай коротко та дружньо українською мовою
- Допомагай з вибором товарів
- Пояснюй умови доставки та оплати
- Якщо не знаєш відповіді, порадь звернутися до консультанта
- Використовуй емодзі для дружелюбності 😊

Відповідай природно та корисно!`;

// Fallback відповіді на популярні питання
const FALLBACK_RESPONSES: Record<string, string> = {
  'як оформити замовлення': 'Щоб оформити замовлення:\n1️⃣ Додайте товари до кошика, натиснувши "Додати до кошика"\n2️⃣ Перейдіть до кошика (іконка 🛒 вгорі)\n3️⃣ Перевірте список товарів\n4️⃣ Натисніть "Оформити замовлення"\n5️⃣ Заповніть дані доставки та контакти\n\nЯкщо виникнуть питання - я завжди тут! 😊',
  
  'скільки часу займає доставка': 'Доставка по Україні займає:\n📦 2-5 робочих днів\n🚚 У великі міста - часто швидше\n📍 У віддалені регіони - до 5 днів\n\nВартість доставки:\n✅ Безкоштовна від 1000₴\n💰 80₴ при сумі менше 1000₴\n\nТрек-номер надішлемо на email після відправки! 📧',
  
  'які способи оплати': 'Ми приймаємо такі способи оплати:\n\n💳 Картою онлайн:\n  • Visa, Mastercard\n  • Безпечна оплата\n  • Миттєве підтвердження\n\n💵 При отриманні:\n  • Готівкою кур\'єру\n  • Карткою через термінал\n  • В пункті видачі\n\nОбирайте зручний спосіб! 😊',
  
  'як повернути товар': 'Повернення товару:\n\n✅ Термін: 14 днів з моменту отримання\n📦 Товар має бути в оригінальній упаковці\n🏷️ Збережіть всі ярлики та етикетки\n\nЯк повернути:\n1. Напишіть нам на email\n2. Вкажіть номер замовлення\n3. Опишіть причину повернення\n4. Ми надішлемо інструкції\n\n💰 Гроші повернемо протягом 5-7 днів',
  
  'звідки постачаються товари': 'Наші товари - 100% якість! 🌿\n\n🍵 Чай та кава:\n  • З органічних плантацій\n  • Сертифіковані постачальники\n  • Прямі контракти з фермерами\n\n🧴 Косметика:\n  • Натуральні інгредієнти\n  • Без хімії та парабенів\n  • Ручна робота майстрів\n\n♻️ Екологічні товари:\n  • Sustainable виробництво\n  • Biodegradable матеріали\n\nЯкість підтверджена сертифікатами! 📜',
  
  'які товари': 'У нас великий вибір натуральних товарів! 🌿\n\n☕ Напої:\n  • Зелений чай матча (250₴)\n  • Органічна кава Арабіка (350₴)\n  • Травяні збори\n\n🧼 Косметика:\n  • Натуральне мило ручної роботи (120₴)\n  • Шампуні та кондиціонери\n  • Креми для обличчя\n\n🕯️ Декор:\n  • Ароматичні свічки з соєвого воску (180₴)\n  • Арома-дифузори\n\n♻️ Еко-товари:\n  • Бавовняні еко-сумки (150₴)\n  • Бамбукові зубні щітки (85₴)\n\nПерегляньте наш каталог! 🛍️',
  
  'default': 'Дякую за питання! 😊\n\nЯ можу допомогти з:\n• Оформленням замовлення\n• Умовами доставки та оплати\n• Поверненням товару\n• Інформацією про продукцію\n\nЯкщо у вас специфічне питання, наш консультант зв\'яжеться з вами найближчим часом! 📞\n\nЩо саме вас цікавить? 🌿'
};

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  
  // Шукаємо ключові слова в питанні
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Якщо немає відповіді - повертаємо дефолтну
  return FALLBACK_RESPONSES.default;
}

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Використовуємо fallback якщо API недоступний
    if (USE_FALLBACK) {
      const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
      const response = getFallbackResponse(lastUserMessage?.content || '');
      return res.json({ message: response });
    }

    // Оригінальна логіка з API (коли будуть кредити)

    // Оригінальна логіка з API (коли будуть кредити)
    // Підготовка повідомлень для OpenRouter
    const openRouterMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ];

    // Запит до OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5174',
        'X-Title': 'Sunleaf Shop'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: openRouterMessages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      throw new Error('OpenRouter API request failed');
    }

    const data = await response.json() as any;
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    res.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback на локальну відповідь при помилці
    const { messages } = req.body;
    const lastUserMessage = messages?.filter((m: any) => m.role === 'user').pop();
    const fallbackResponse = getFallbackResponse(lastUserMessage?.content || '');
    
    res.json({ message: fallbackResponse });
  }
});

export default router;
