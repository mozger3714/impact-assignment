import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { fetchProductsByCategory } from '@/lib/api'
import type { Product } from '@/types/types'
import { formatCategorySlug } from '@/utils/helper'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const formattedTile = formatCategorySlug(slug)
  const title = `${formattedTile} – FakeStore`
  return {
    title,
    description: `Browse products in category ${formattedTile} at FakeAPI Store.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const products: Product[] = await fetchProductsByCategory(slug)

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold capitalize">
            {decodeURIComponent(slug)}
          </h1>
          <p className="text-sm text-gray-500">{products.length} products</p>
        </div>
        <Link href="/" className="text-sm underline">
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
