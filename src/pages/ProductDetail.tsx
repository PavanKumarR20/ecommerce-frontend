import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '@/services/api'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!id) return
    void fetchProduct(id)
  }, [id])

  async function fetchProduct(productId: string) {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.get<Product>(`/api/products/${productId}`)
      setProduct(data)
    } catch {
      setError('Product not found.')
    } finally {
      setLoading(false)
    }
  }

  function handleAddToCart() {
    if (!product) return
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-medium mb-4">{error ?? 'Product not found.'}</p>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 underline text-sm"
        >
          Back to products
        </button>
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-indigo-600 hover:underline mb-6 flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover max-h-96"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/600x400?text=No+Image'
          }}
        />

        <div className="flex flex-col">
          <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <p className="mt-6 text-3xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Qty</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`mt-6 py-3 rounded-xl font-medium transition-colors ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </main>
  )
}
