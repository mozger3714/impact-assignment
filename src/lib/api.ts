import type { Product } from "@/types/types"

const BASE_API_URL = 'https://fakestoreapi.com'

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_API_URL}/products/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_API_URL}/products/category/${category}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE_API_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}