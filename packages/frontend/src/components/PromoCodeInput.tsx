import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface PromoCodeInputProps {
  totalAmount: number;
  onPromoApplied: (discount: number, code: string) => void;
}

export default function PromoCodeInput({ totalAmount, onPromoApplied }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number, type: string} | null>(null);

  const handleApply = async () => {
    if (!code.trim()) {
      toast.error('Введіть промокод');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase(), totalAmount })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Невірний промокод');
        return;
      }

      setAppliedPromo({
        code: data.code,
        discount: data.discount,
        type: data.type
      });
      
      onPromoApplied(data.discountAmount, data.code);
      toast.success(`Промокод ${data.code} застосовано! Знижка: ${
        data.type === 'PERCENTAGE' ? `${data.discount}%` : `${data.discount} ₴`
      }`);
    } catch (error) {
      toast.error('Помилка перевірки промокоду');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setAppliedPromo(null);
    setCode('');
    onPromoApplied(0, '');
    toast.success('Промокод видалено');
  };

  return (
    <div className="space-y-3">
      {!appliedPromo ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
              placeholder="Введіть промокод"
              className="input pl-11 uppercase"
              disabled={loading}
            />
          </div>
          <button
            onClick={handleApply}
            disabled={loading || !code.trim()}
            className="btn btn-secondary whitespace-nowrap"
          >
            {loading ? 'Перевірка...' : 'Застосувати'}
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-500/50 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-full">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-green-900 dark:text-green-100">
                {appliedPromo.code}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Знижка: {appliedPromo.type === 'PERCENTAGE' ? `${appliedPromo.discount}%` : `${appliedPromo.discount} ₴`}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-green-700 dark:text-green-300" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
