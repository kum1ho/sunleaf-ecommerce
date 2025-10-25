import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ReviewListProps {
  productId: string;
  currentUserId?: string;
  isAdmin?: boolean;
}

export default function ReviewList({ productId, currentUserId, isAdmin }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<number | 'all'>('all');

  // Fetch reviews
  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/reviews/product/${productId}`);
      const data = await response.json();
      setReviews(data.reviews);
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Увійдіть, щоб відмітити корисний відгук');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Дякуємо за відгук!');
        fetchReviews();
      }
    } catch (error) {
      toast.error('Помилка');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Видалити відгук?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Відгук видалено');
        fetchReviews();
      }
    } catch (error) {
      toast.error('Помилка видалення');
    }
  };

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === filter);

  if (loading) {
    return <div className="text-center py-8">Завантаження відгуків...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="card">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gradient mb-2">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(stats.averageRating)
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              На основі {stats.total} відгуків
            </p>
          </div>

          {/* Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilter(filter === rating ? 'all' : rating)}
                className="w-full flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
              >
                <span className="text-sm font-medium w-12 text-left">{rating} ★</span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                    style={{
                      width: `${stats.total > 0 ? (stats.distribution[rating as keyof typeof stats.distribution] / stats.total) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                  {stats.distribution[rating as keyof typeof stats.distribution]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter indicator */}
      {filter !== 'all' && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Показано відгуки з оцінкою {filter} зірок
          </p>
          <button
            onClick={() => setFilter('all')}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Показати всі
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredReviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-gray-500 dark:text-gray-400"
            >
              {filter === 'all' ? 'Поки що немає відгуків' : 'Немає відгуків з такою оцінкою'}
            </motion.div>
          ) : (
            filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {review.user.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString('uk-UA', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {(currentUserId === review.user.id || isAdmin) && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {review.comment && (
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {review.comment}
                  </p>
                )}

                <button
                  onClick={() => handleHelpful(review.id)}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Корисно ({review.helpful})
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
