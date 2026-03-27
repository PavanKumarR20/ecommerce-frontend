import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/services/api'
import { useCart } from '@/context/CartContext'
import type { Order } from '@/types'

export default function Checkout() {
  const { items, totalAmount, clearCart } = useCart()
  const navigate = useNavigate()

  const [address, setAddress] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const products = items.map(({ product, quantity }) => ({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
      }))
      await api.post<Order>('/api/orders', { products, totalAmount, address })
      clearCart()
      navigate('/orders')
    } catch {
      setError('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 underline text-sm"
        >
          Browse products
        </button>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Order summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-2">
          {items.map(({ product, quantity }) => (
            <div key={product._id} className="flex justify-between text-sm text-gray-700">
              <span>
                {product.name} × {quantity}
              </span>
              <span>₹{(product.price * quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Address form */}
      <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, City, State, ZIP"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Placing order…' : `Place Order · ₹${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </main>
  )
}
