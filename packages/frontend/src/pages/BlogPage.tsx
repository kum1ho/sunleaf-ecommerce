import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: number;
  featured?: boolean;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['Всі', 'Чай', 'Кава', 'Екологія', 'Рецепти', 'Здоров\'я'];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      slug: '10-green-tea-benefits',
      title: '10 порад для ідеального ранку з зеленим чаєм',
      excerpt: 'Дізнайтеся, як правильно заварювати зелений чай та створити свій ідеальний ранковий ритуал',
      content: 'Повний текст статті...',
      author: 'Олена Коваленко',
      date: '2024-10-20',
      category: 'Чай',
      imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
      readTime: 5,
      featured: true
    },
    {
      id: '2',
      slug: 'perfect-turkish-coffee',
      title: 'Як кава впливає на продуктивність: наукові факти',
      excerpt: 'Останні дослідження про вплив кофеїну на когнітивні функції та робочу ефективність',
      content: 'Повний текст статті...',
      author: 'Максим Петров',
      date: '2024-10-18',
      category: 'Кава',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
      readTime: 7,
      featured: true
    },
    {
      id: '3',
      slug: 'eco-packaging',
      title: 'Екологічна упаковка: наш шлях до zero waste',
      excerpt: 'Розповідаємо про наші ініціативи зменшення впливу на довкілля',
      content: 'Повний текст статті...',
      author: 'Анна Шевченко',
      date: '2024-10-15',
      category: 'Екологія',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      readTime: 4
    },
    {
      id: '4',
      slug: 'cold-tea-recipes',
      title: '5 рецептів холодного чаю для спекотного літа',
      excerpt: 'Освіжаючі варіації улюбленого напою з натуральними інгредієнтами',
      content: 'Повний текст статті...',
      author: 'Олена Коваленко',
      date: '2024-10-12',
      category: 'Рецепти',
      imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
      readTime: 6
    },
    {
      id: '5',
      slug: 'green-tea-antioxidants',
      title: 'Антиоксиданти в зеленому чаї: користь для здоров\'я',
      excerpt: 'Чому зелений чай називають напоєм довголіття та як він працює',
      content: 'Повний текст статті...',
      author: 'Дмитро Іванов',
      date: '2024-10-10',
      category: 'Здоров\'я',
      imageUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800',
      readTime: 8
    },
    {
      id: '6',
      slug: 'coffee-history',
      title: 'Історія кави: від Ефіопії до вашої чашки',
      excerpt: 'Захоплива подорож кави крізь століття та континенти',
      content: 'Повний текст статті...',
      author: 'Максим Петров',
      date: '2024-10-08',
      category: 'Кава',
      imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
      readTime: 10
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category === selectedCategory ||
                           selectedCategory === 'Всі';
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(p => p.featured);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
          <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
            Корисні поради та цікаві статті
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Блог <span className="text-gradient">Sunleaf</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Дізнавайтесь більше про чай, каву, здоровий спосіб життя та екологічні практики
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Шукати статті..."
              className="input pl-12"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'Всі' ? 'all' : category)}
                className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  (selectedCategory === 'all' && category === 'Всі') || selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && !searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl group cursor-pointer"
        >
          <div className="absolute inset-0">
            <img
              src={featuredPost.imageUrl}
              alt={featuredPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          <div className="relative p-8 md:p-12 min-h-[500px] flex flex-col justify-end">
            <div className="inline-flex items-center gap-2 mb-4 w-fit px-3 py-1 bg-accent-600 text-white rounded-full text-sm font-bold">
              <Tag className="w-4 h-4" />
              Рекомендоване
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              {featuredPost.title}
            </h2>
            
            <p className="text-xl text-gray-200 mb-6 max-w-2xl">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex items-center gap-6 text-gray-300 text-sm mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {featuredPost.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(featuredPost.date).toLocaleDateString('uk-UA', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <span>{featuredPost.readTime} хв читання</span>
            </div>
            
            <Link to={`/blog/${featuredPost.slug}`} className="btn btn-primary w-fit">
              Читати повністю
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts
          .filter(post => !post.featured || searchQuery || selectedCategory !== 'all')
          .map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="card-hover group cursor-pointer"
            >
              <div className="relative h-48 -m-6 mb-6 overflow-hidden rounded-t-3xl">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 dark:text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gradient transition-all">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <span>{post.readTime} хв</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('uk-UA', {
                  day: 'numeric',
                  month: 'long'
                })}
              </div>
              
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
              >
                Читати далі
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>
          ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            За вашим запитом нічого не знайдено. Спробуйте інші ключові слова.
          </p>
        </div>
      )}
    </div>
  );
}
