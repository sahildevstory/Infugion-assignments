import { Package, Heart } from 'lucide-react';

interface EmptyStateProps {
  type?: 'no-results' | 'no-favorites';
  searchQuery?: string;
}

export function EmptyState({ type = 'no-results', searchQuery }: EmptyStateProps) {
  if (type === 'no-favorites') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Heart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Start adding products to your favorites by clicking the heart icon on any product.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Package className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-muted-foreground max-w-sm">
        {searchQuery
          ? `No products match "${searchQuery}". Try a different search term or filter.`
          : 'No products match your current filters. Try adjusting your filters.'}
      </p>
    </div>
  );
}
