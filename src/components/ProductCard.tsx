import { Link } from 'react-router-dom'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).src =
            'https://placehold.co/400x300?text=No+Image'
        }}
      />
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="mt-1 font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-auto pt-3 text-lg font-bold text-gray-900">
          ₹{product.price.toFixed(2)}
        </p>
        <Link
          to={`/products/${product._id}`}
          className="mt-3 block text-center bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
