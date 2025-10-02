import { fetchCategories } from '@/lib/api'
import CategoryTile from '@/components/CategoryTile'

export default async function Page() {
  const categories = await fetchCategories()

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryTile key={cat} category={cat} />
        ))}
      </div>
    </section>
  )
}
