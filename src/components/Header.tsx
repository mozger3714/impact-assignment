'use client'
import Link from 'next/link'
import { useCart } from './CartProvider'

export default function Header() {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="w-full border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          IMPACT TEST Store
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/">
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7m12-7l2 7m-6-7v7"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full bg-red-600 text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
