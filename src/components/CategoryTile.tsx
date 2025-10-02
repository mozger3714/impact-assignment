import Link from 'next/link'

export default function CategoryTile({ category }: { category: string }) {
  const href = `/category/${encodeURIComponent(category)}`
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-400 to-blue-600 text-white shadow-md hover:shadow-xl transition-all px-2 py-6 flex items-center justify-center text-center"
    >
      <span className="capitalize font-semibold text-lg group-hover:scale-105 transition-transform">
        {category}
      </span>
    </Link>
  )
}
