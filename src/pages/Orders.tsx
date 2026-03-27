import { useEffect, useState } from 'react'
import api from '@/services/api'
import type { Order } from '@/types'

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void fetchOrders()
  }, [])

  async function fetchOrders() {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.get<Order[]>('/api/orders/my')
      setOrders(data)
    } catch {
      setError('Failed to load orders.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">{error}</div>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500 text-center py-10">No orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-400 font-mono">{order._id}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <span className="text-lg font-bold text-gray-900">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="space-y-1 mb-4">
              {order.products.map((p, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-700">
                  <span>
                    {p.name} × {p.quantity}
                  </span>
                  <span>₹{(p.price * p.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">
              <span className="font-medium text-gray-500">Delivery: </span>
              {order.address}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
