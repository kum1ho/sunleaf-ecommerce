import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, Truck, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  shippingAddress: string;
  shippingCity: string;
  items: Array<{
    quantity: number;
    price: number;
    product: { name: string; imageUrl: string };
  }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    PENDING: {
      label: 'Очікується',
      icon: Clock,
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    },
    PROCESSING: {
      label: 'Обробляється',
      icon: Package,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    },
    SHIPPED: {
      label: 'Відправлено',
      icon: Truck,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    },
    DELIVERED: {
      label: 'Доставлено',
      icon: CheckCircle,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
    },
    CANCELLED: {
      label: 'Скасовано',
      icon: XCircle,
      color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Немає замовлень"
        description="Ви ще не зробили жодного замовлення. Перегляньте наш каталог та оберіть щось особливе!"
        actionText="Перейти до каталогу"
        actionLink="/catalog"
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold mb-3 text-gray-900 dark:text-white"
        >
          Мої замовлення
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Всього замовлень: {orders.length}
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order, idx) => {
          const status = statusConfig[order.status as keyof typeof statusConfig];
          const StatusIcon = status?.icon || Package;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card-hover"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Замовлення #{order.id.slice(0, 8)}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleString('uk-UA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${status.color} font-semibold`}>
                  <StatusIcon className="w-5 h-5" />
                  {status.label}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {order.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Кількість: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600 dark:text-primary-400">
                        {(item.price * item.quantity).toFixed(2)} ₴
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-1">
                    <strong className="text-gray-900 dark:text-white">Адреса доставки:</strong>
                  </p>
                  <p>{order.shippingCity}, {order.shippingAddress}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Всього:</p>
                    <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {order.total.toFixed(2)} ₴
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Деталі
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Деталі замовлення #{selectedOrder.id.slice(0, 8)}
            </h2>

            {/* Full order details here */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Товари:</h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">{item.product.name} x{item.quantity}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toFixed(2)} ₴
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-900 dark:text-white">Разом:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    {selectedOrder.total.toFixed(2)} ₴
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="btn btn-secondary w-full mt-6"
              >
                Закрити
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
