'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { fetchProduct } from '@/lib/api';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductDetailSkeleton } from '@/components/loading-skeleton';
import { ErrorState } from '@/components/error-state';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isFavorite, toggleFavorite, isLoaded: favoritesLoaded } = useFavorites();

  useEffect(() => {
    if (params.id) {
      loadProduct(params.id as string);
    }
  }, [params.id]);

  const loadProduct = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProduct(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !favoritesLoaded) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetailSkeleton />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorState
          title="Product not found"
          message={error || 'The product you are looking for does not exist.'}
          onRetry={() => loadProduct(params.id as string)}
        />
      </main>
    );
  }

  const productIsFavorite = isFavorite(product.id);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3 capitalize">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating.rate}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.rating.count} reviews)
              </span>
            </div>

            <div className="text-4xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                alert('Add to cart functionality would be implemented here');
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <Button
              variant={productIsFavorite ? 'default' : 'outline'}
              size="lg"
              className="w-full"
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart
                className={`mr-2 h-5 w-5 ${productIsFavorite ? 'fill-current' : ''}`}
              />
              {productIsFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Product ID</span>
              <span className="font-medium">{product.id}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium capitalize">{product.category}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Availability</span>
              <span className="font-medium text-green-600">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
