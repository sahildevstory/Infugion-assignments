export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface FilterOptions {
  searchQuery: string;
  selectedCategory: string;
  showFavoritesOnly: boolean;
  sortBy: SortOption;
}
