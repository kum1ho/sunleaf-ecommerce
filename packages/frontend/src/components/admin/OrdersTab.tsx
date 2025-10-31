import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, Truck, CheckCircle, XCircle, Edit2, Save, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  shippingAddress: string;
  shippingCity: string;
  phone: string;
  user: { email: string; name: string };
  items: Array<{
    quantity: number;
    price: number;
    product: { name: string; imageUrl: string };
  }>;
}

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Очікується', color: 'amber' },
  { value: 'PROCESSING', label: 'Обробляється', color: 'blue' },
  { value: 'SHIPPED', label: 'Відправлено', color: 'purple' },
  { value: 'DELIVERED', label: 'Доставлено', color: 'green' },
  { value: 'CANCELLED', label: 'Скасовано', color: 'red' }
];

const statusConfig: Record<string, any> = {
  PENDING: { label: 'Очікується', icon: Clock, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
  PROCESSING: { label: 'Обробляється', icon: Package, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  SHIPPED: { label: 'Відправлено', icon: Truck, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
  DELIVERED: { label: 'Доставлено', icon: CheckCircle, color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' },
  CANCELLED: { label: 'Скасовано', icon: XCircle, color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' }
};

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        toast.success('Статус замовлення оновлено!');
        setEditingOrderId(null);
        fetchOrders();
      } else {
        toast.error('Помилка оновлення статусу');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Помилка оновлення статусу');
    }
  };

  const startEditing = (order: Order) => {
    setEditingOrderId(order.id);
    setNewStatus(order.status);
  };

  const cancelEditing = () => {
    setEditingOrderId(null);
    setNewStatus('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Управління замовленнями
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Немає замовлень</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status?.icon || Package;
            const isEditing = editingOrderId === order.id;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Замовлення #{order.id.slice(0, 8)}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleString('uk-UA')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Клієнт: <strong>{order.user.name}</strong> ({order.user.email})
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleStatusUpdate(order.id, newStatus)}
                          className="p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50"
                        >
                          <Save className="w-5 h-5" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${status.color} font-semibold`}>
                          <StatusIcon className="w-5 h-5" />
                          {status.label}
                        </div>
                        <button
                          onClick={() => startEditing(order)}
                          className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {item.quantity} x {item.price.toFixed(2)} ₴
                        </p>
                      </div>
                      <p className="font-bold text-primary-600 dark:text-primary-400">
                        {(item.price * item.quantity).toFixed(2)} ₴
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Адреса:</strong> {order.shippingCity}, {order.shippingAddress}</p>
                    <p><strong>Телефон:</strong> {order.phone}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Загальна сума:</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {order.total.toFixed(2)} ₴
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
