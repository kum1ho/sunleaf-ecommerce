import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield, Package, Check } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsFavorite(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      navigate('/catalog');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(
        {
          id: product.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl
        },
        quantity
      );
      toast.success(`${product.name} додано до кошика!`, {
        icon: '🛒',
        position: 'top-right'
      });
    }
  };

  const toggleFavorite = () => {
    if (!product) return;
    
    const inWishlist = isInWishlist(product.id);
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      setIsFavorite(false);
      toast.success('Видалено з улюблених', { icon: '💔' });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category
      });
      setIsFavorite(true);
      toast.success('Додано до улюблених', { icon: '❤️' });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const relatedProducts = [
    { id: '1', name: 'Арабіка Колумбія', price: 299, imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400' },
    { id: '2', name: 'Зелений чай Сенча', price: 189, imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400' },
    { id: '3', name: 'Шоколадні цукерки', price: 149, imageUrl: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=400' }
  ];

  return (
    <div className="space-y-12">
      <Toaster />
      
      {/* Breadcrumb */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-primary-600 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Повернутись назад</span>
      </motion.button>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="relative group aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-white' : ''}`} />
            </motion.button>

            {product.stock < 10 && product.stock > 0 && (
              <div className="absolute top-4 left-4 bg-amber-500 text-white font-bold px-4 py-2 rounded-full">
                Залишилось {product.stock}
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-4 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold">
                {product.category === 'COFFEE' ? '☕ Кава' : product.category === 'TEA' ? '🍵 Чай' : '🍬 Солодощі'}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-[var(--text-secondary)]">4.8 (127 відгуків)</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {product.name}
            </h1>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400">
              {product.price.toFixed(2)} ₴
            </span>
            <span className="text-lg sm:text-xl lg:text-2xl line-through text-gray-400">
              {(product.price * 1.2).toFixed(2)} ₴
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs sm:text-sm font-bold">
              -20%
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2 sm:space-y-3">
            <label className="font-semibold text-base sm:text-lg">Кількість:</label>
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--bg-secondary)] hover:bg-primary-100 dark:hover:bg-primary-900/30 font-bold text-lg sm:text-xl flex items-center justify-center"
              >
                -
              </motion.button>
              <span className="w-12 sm:w-16 text-center text-xl sm:text-2xl font-bold">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--bg-secondary)] hover:bg-primary-100 dark:hover:bg-primary-900/30 font-bold text-lg sm:text-xl flex items-center justify-center"
              >
                +
              </motion.button>
              <span className="text-[var(--text-secondary)] ml-2">
                {product.stock > 0 ? `(В наявності: ${product.stock})` : 'Немає в наявності'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn btn-primary flex-1 text-sm sm:text-base lg:text-lg py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden xs:inline">{product.stock > 0 ? 'Додати в кошик' : 'Немає в наявності'}</span>
              <span className="xs:hidden">{product.stock > 0 ? 'В кошик' : 'Немає'}</span>
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg shrink-0">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base">Безкоштовна доставка</div>
                <div className="text-xs sm:text-sm text-[var(--text-secondary)]">від 500 ₴</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base">Гарантія якості</div>
                <div className="text-xs sm:text-sm text-[var(--text-secondary)]">100%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg shrink-0">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base">Повернення</div>
                <div className="text-xs sm:text-sm text-[var(--text-secondary)]">14 днів</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 sm:pt-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Опис товару</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed">
            {product.description}
          </p>
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Переваги
              </h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  Висока якість сировини
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  Натуральні інгредієнти
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  Сертифіковано якість
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Характеристики</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex justify-between">
                  <span>Виробник:</span>
                  <span className="font-semibold">Sunleaf</span>
                </li>
                <li className="flex justify-between">
                  <span>Країна:</span>
                  <span className="font-semibold">Україна</span>
                </li>
                <li className="flex justify-between">
                  <span>Термін придатності:</span>
                  <span className="font-semibold">12 місяців</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
        <h2 className="text-3xl font-bold mb-8">Відгуки покупців</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ReviewList 
              productId={product.id} 
              currentUserId={localStorage.getItem('userId') || undefined}
              isAdmin={localStorage.getItem('userRole') === 'ADMIN'}
            />
          </div>
          <div>
            <ReviewForm 
              productId={product.id}
              onReviewSubmitted={() => window.location.reload()}
            />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
        <h2 className="text-3xl font-bold mb-8">Схожі товари</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group card cursor-pointer"
            >
              <Link to={`/product/${item.id}`}>
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 transition">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {item.price} ₴
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
