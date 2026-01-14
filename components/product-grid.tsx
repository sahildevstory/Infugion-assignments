'use client';

import { Product } from '@/types/product';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  favorites: number[];
  onToggleFavorite: (productId: number) => void;
}

export function ProductGrid({
  products,
  favorites,
  onToggleFavorite,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
