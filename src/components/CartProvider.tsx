'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Product } from '@/types/types'

type CartItem = { product: Product; quantity: number }

type CartContext = {
  items: CartItem[]
  add: (p: Product, qty?: number) => void
  remove: (id: number) => void
  updateQty: (id: number, qty: number) => void
  total: () => number
}

const CartCtx = createContext<CartContext | undefined>(undefined)

const STORAGE_KEY = 'store_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load cart', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save cart', e)
    }
  }, [items])

  function add(product: Product, qty = 1) {
    setItems((curr) => {
      const found = curr.find((i) => i.product.id === product.id)
      if (found)
        return curr.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        )
      return [...curr, { product, quantity: qty }]
    })
  }

  function remove(id: number) {
    setItems((curr) => curr.filter((i) => i.product.id !== id))
  }

  function updateQty(id: number, qty: number) {
    setItems((curr) =>
      curr.map((i) =>
        i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i
      )
    )
  }

  function total() {
    return items.reduce((s, it) => s + it.product.price * it.quantity, 0)
  }

  return (
    <CartCtx.Provider value={{ items, add, remove, updateQty, total }}>
      {children}
    </CartCtx.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
