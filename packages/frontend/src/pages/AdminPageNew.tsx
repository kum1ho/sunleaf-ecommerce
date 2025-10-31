import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, TrendingUp, Users, ShoppingCart, 
  LayoutGrid, MessageSquare, ClipboardList 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Loading from '../components/Loading';
import ProductsTab from '../components/admin/ProductsTab';
import OrdersTab from '../components/admin/OrdersTab';
import DialogsTab from '../components/admin/DialogsTab';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
}

type TabType = 'products' | 'orders' | 'dialogs';

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('products');
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const statsCards = [
    { label: 'Товари', value: stats?.totalProducts || 0, icon: Package, color: 'from-primary-500 to-accent-500' },
    { label: 'Замовлення', value: stats?.totalOrders || 0, icon: ShoppingCart, color: 'from-blue-500 to-purple-500' },
    { label: 'Дохід', value: `${stats?.totalRevenue.toFixed(2) || 0} ₴`, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Користувачі', value: stats?.totalUsers || 0, icon: Users, color: 'from-orange-500 to-red-500' }
  ];

  const tabs = [
    { id: 'products' as TabType, label: 'Товари', icon: LayoutGrid },
    { id: 'orders' as TabType, label: 'Замовлення', icon: ClipboardList },
    { id: 'dialogs' as TabType, label: 'Діалоги', icon: MessageSquare }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900 dark:text-white"
        >
          Адмін-панель
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Керування магазином Sunleaf
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative overflow-hidden"
          >
            <div className="card-hover">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-16 -mt-16`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  <div className={`p-2 bg-gradient-to-br ${stat.color} rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'dialogs' && <DialogsTab />}
        </div>
      </div>
    </div>
  );
}
