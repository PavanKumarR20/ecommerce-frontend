import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { items, totalAmount, removeFromCart, updateQuantity } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <Link to="/" className="text-indigo-600 underline text-sm">
          Browse products
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).src =
                  'https://placehold.co/80x80?text=?'
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="mt-1 font-medium text-gray-900">
                ₹{product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    quantity > 1
                      ? updateQuantity(product._id, quantity - 1)
                      : removeFromCart(product._id)
                  }
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                >
                  −
                </button>
                <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product._id, quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                >
                  +
                </button>
              </div>
              <p className="text-sm font-semibold text-indigo-600">
                ₹{(product.price * quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(product._id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            ₹{totalAmount.toFixed(2)}
          </span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </main>
  )
}
