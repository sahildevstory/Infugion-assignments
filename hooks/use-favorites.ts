'use client';

import { useState, useEffect } from 'react';
import { getFavorites, toggleFavorite as toggleFavoriteStorage } from '@/lib/favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (productId: number) => {
    toggleFavoriteStorage(productId);
    setFavorites(getFavorites());
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoaded,
  };
}
