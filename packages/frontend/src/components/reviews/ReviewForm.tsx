import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Поставте оцінку');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Увійдіть, щоб залишити відгук');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          rating,
          comment
        })
      });

      if (response.ok) {
        toast.success('Дякуємо за відгук!');
        setRating(0);
        setComment('');
        onReviewSubmitted();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Помилка відправки відгуку');
      }
    } catch (error) {
      toast.error('Помилка відправки відгуку');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Залишити відгук
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Ваша оцінка *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {rating === 5 && '⭐ Чудово!'}
              {rating === 4 && '👍 Добре'}
              {rating === 3 && '👌 Непогано'}
              {rating === 2 && '😐 Так собі'}
              {rating === 1 && '👎 Погано'}
            </p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Ваш відгук (необов'язково)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="input"
            placeholder="Розкажіть про свій досвід використання товару..."
            maxLength={1000}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-right">
            {comment.length}/1000
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || rating === 0}
          className="btn btn-primary w-full"
        >
          {loading ? (
            'Відправка...'
          ) : (
            <>
              <Send className="w-5 h-5" />
              Відправити відгук
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
