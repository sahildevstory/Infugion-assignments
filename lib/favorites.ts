const FAVORITES_KEY = 'product-favorites';

export function getFavorites(): number[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isFavorite(productId: number): boolean {
  const favorites = getFavorites();
  return favorites.includes(productId);
}

export function toggleFavorite(productId: number): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(productId);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function addFavorite(productId: number): void {
  const favorites = getFavorites();
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(productId: number): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(id => id !== productId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}
