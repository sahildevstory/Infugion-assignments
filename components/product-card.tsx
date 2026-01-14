'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleFavorite(product.id);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              'absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity',
              isFavorite && 'opacity-100'
            )}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn(
                'h-4 w-4',
                isFavorite && 'fill-red-500 text-red-500'
              )}
            />
          </Button>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <Badge variant="secondary" className="mb-2 w-fit text-xs">
            {product.category}
          </Badge>

          <h3 className="font-semibold text-sm line-clamp-2 mb-2 flex-1">
            {product.title}
          </h3>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating.rate}</span>
              <span>({product.rating.count})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
