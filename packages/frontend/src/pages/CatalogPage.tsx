import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid3x3, List, ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const addItem = useCartStore(state => state.addItem);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (search) params.set('search', search);

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    });
    toast.success(`${product.name} додано в кошик!`, {
      icon: '🛒',
      duration: 2000,
      position: 'bottom-right'
    });
  };

  const categoryLabels: Record<string, string> = {
    COFFEE: 'Кава',
    TEA: 'Чай',
    SWEETS: 'Солодощі'
  };

  return (
    <div className="space-y-8">
      <Toaster />
      
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Каталог</h1>
            <p className="text-[var(--text-secondary)]">
              {category ? categoryLabels[category] : 'Всі товари'} • {products.length} {products.length === 1 ? 'товар' : 'товарів'}
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-primary-600 text-white'
                  : 'bg-[var(--bg-secondary)] hover:bg-primary-100 dark:hover:bg-primary-900/30'
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'bg-[var(--bg-secondary)] hover:bg-primary-100 dark:hover:bg-primary-900/30'
              }`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Пошук товарів..."
              className="input pl-12 w-full"
              value={search}
              onChange={(e) => setSearchParams({ ...Object.fromEntries(searchParams), search: e.target.value })}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input md:w-48"
          >
            <option value="featured">Рекомендовані</option>
            <option value="price-low">Ціна: низька → висока</option>
            <option value="price-high">Ціна: висока → низька</option>
            <option value="name">Назва (А-Я)</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 flex-wrap">
          {['Всі', 'COFFEE', 'TEA', 'SWEETS'].map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchParams(cat === 'Всі' ? {} : { category: cat })}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                (cat === 'Всі' && !category) || category === cat
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-[var(--bg-secondary)] hover:bg-primary-100 dark:hover:bg-primary-900/30'
              }`}
            >
              {cat === 'Всі' ? 'Всі' : cat === 'COFFEE' ? '☕ Кава' : cat === 'TEA' ? '🍵 Чай' : '🍬 Солодощі'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Нічого не знайдено</h2>
          <p className="text-[var(--text-secondary)]">Спробуйте інші фільтри або пошуковий запит</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
            }
          >
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group card overflow-hidden"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 mb-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {product.stock < 10 && product.stock > 0 && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Залишилось {product.stock}
                      </div>
                    )}
                    
                    {product.stock === 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Немає в наявності
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
                      {product.name}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[var(--text-secondary)]">4.0 (24)</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        {product.price.toFixed(2)} ₴
                      </span>
                    </div>
                  </div>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`btn w-full mt-4 flex items-center justify-center gap-2 ${
                    product.stock === 0 
                      ? 'btn-secondary opacity-50 cursor-not-allowed' 
                      : 'btn-primary'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock === 0 ? 'Немає в наявності' : 'Додати в кошик'}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
