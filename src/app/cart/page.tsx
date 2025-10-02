'use client'
import { useCart } from '@/components/CartProvider'
import Image from 'next/image'

export default function CartPage() {
  const { items, remove, updateQty, total } = useCart()

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {items.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-6 rounded border border-gray-200 dark:border-slate-700">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div
              key={it.product.id}
              className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded border border-gray-200 dark:border-slate-700 p-4 flex gap-4 items-center"
            >
              {it.product.image && (
                <div className="w-24 h-24 relative">
                  <Image
                    src={it.product.image}
                    alt={it.product.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium">{it.product.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ${it.product.price.toFixed(2)} each
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm">Amount:</label>
                  <input
                    type="number"
                    value={it.quantity}
                    min={1}
                    onChange={(e) =>
                      updateQty(it.product.id, Number(e.target.value) || 1)
                    }
                    className="w-20 p-1 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-slate-600"
                  />
                  <button
                    onClick={() => remove(it.product.id)}
                    className="ml-4 text-sm text-red-600 dark:text-red-400 cursor-pointer hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${(it.product.price * it.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-4 rounded border border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <div className="font-medium">Total</div>
            <div className="text-xl font-bold">${total().toFixed(2)}</div>
          </div>
        </div>
      )}
    </section>
  )
}
