import { Product, FilterOptions } from '@/types/product';

export function filterProducts(
  products: Product[],
  filters: FilterOptions,
  favorites: number[]
): Product[] {
  let filtered = [...products];

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  if (filters.selectedCategory && filters.selectedCategory !== 'all') {
    filtered = filtered.filter(
      product => product.category === filters.selectedCategory
    );
  }

  if (filters.showFavoritesOnly) {
    filtered = filtered.filter(product => favorites.includes(product.id));
  }

  filtered = sortProducts(filtered, filters.sortBy);

  return filtered;
}

export function sortProducts(products: Product[], sortBy: FilterOptions['sortBy']): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}
