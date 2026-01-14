'use client';

import { useState, useEffect } from 'react';
import { Product, FilterOptions } from '@/types/product';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { filterProducts } from '@/lib/filters';
import { useFavorites } from '@/hooks/use-favorites';
import { SearchBar } from '@/components/search-bar';
import { ProductFilters } from '@/components/product-filters';
import { ProductGrid } from '@/components/product-grid';
import { ProductGridSkeleton } from '@/components/loading-skeleton';
import { ErrorState } from '@/components/error-state';
import { EmptyState } from '@/components/empty-state';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { favorites, toggleFavorite, isLoaded: favoritesLoaded } = useFavorites();

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    selectedCategory: 'all',
    showFavoritesOnly: false,
    sortBy: 'default',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = filterProducts(products, filters, favorites);

  if (isLoading || !favoritesLoaded) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="h-10 bg-muted animate-pulse rounded" />
          <div className="h-10 bg-muted animate-pulse rounded" />
          <ProductGridSkeleton />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState message={error} onRetry={loadData} />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Product Explorer
          </h1>
          <p className="text-muted-foreground">
            Discover amazing products with smart filtering and search
          </p>
        </div>

        <SearchBar
          value={filters.searchQuery}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, searchQuery: value }))
          }
        />

        <ProductFilters
          categories={categories}
          selectedCategory={filters.selectedCategory}
          onCategoryChange={(category) =>
            setFilters((prev) => ({ ...prev, selectedCategory: category }))
          }
          sortBy={filters.sortBy}
          onSortChange={(sort) =>
            setFilters((prev) => ({ ...prev, sortBy: sort }))
          }
          showFavoritesOnly={filters.showFavoritesOnly}
          onToggleFavorites={() =>
            setFilters((prev) => ({
              ...prev,
              showFavoritesOnly: !prev.showFavoritesOnly,
            }))
          }
          favoritesCount={favorites.length}
          totalCount={products.length}
          filteredCount={filteredProducts.length}
        />

        {filteredProducts.length === 0 ? (
          <EmptyState
            type={filters.showFavoritesOnly ? 'no-favorites' : 'no-results'}
            searchQuery={filters.searchQuery}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>
    </main>
  );
}
