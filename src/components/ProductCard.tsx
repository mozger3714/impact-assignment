'use client'
import Image from 'next/image'
import type { Product } from '@/types/types'
import { useCart } from './CartProvider'
import { useState } from 'react'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    add(product, 1)

    setTimeout(() => {
      setIsAdding(false)
    }, 2500)
  }
  return (
    <div className="border bg-white dark:bg-slate-800 shadow-sm hover:shadow-md rounded-xl bg-white p-3 flex flex-col">
      {product.image ? (
        <div className="w-full h-48 relative mb-3">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-contain"
          />
        </div>
      ) : null}
      {/* I would put a fallback image above instead of the null if I had one :)  */}
      <h3 className="font-semibold line-clamp-2 mb-2">{product.title}</h3>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-semibold cursor-pointer hover:bg-blue-700 transition scale-95 hover:scale-100 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isAdding ? (
            <span className="flex items-center gap-1">
              <span>Added</span>
              <span>✅</span>
            </span>
          ) : (
            'Add to cart'
          )}
        </button>
      </div>
    </div>
  )
}
