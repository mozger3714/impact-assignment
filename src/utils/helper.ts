export function formatCategorySlug(slug: string): string {
  const decoded = decodeURIComponent(slug)
  
  const categoryMap: Record<string, string> = {
    "electronics": "Electronics",
    "jewelery": "Jewelery", 
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing"
  }
  
  return categoryMap[decoded] || 
    decoded.charAt(0).toUpperCase() + decoded.slice(1)
}