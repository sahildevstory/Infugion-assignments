'use client';

import { Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CategoryFilter } from './category-filter';
import { SortSelect } from './sort-select';
import { SortOption } from '@/types/product';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  totalCount: number;
  filteredCount: number;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount,
  totalCount,
  filteredCount,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{' '}
            <span className="font-semibold text-foreground">{totalCount}</span> products
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showFavoritesOnly ? 'default' : 'outline'}
            size="sm"
            onClick={onToggleFavorites}
            className="gap-2"
          >
            <Heart
              className={showFavoritesOnly ? 'fill-current' : ''}
              size={16}
            />
            Favorites
            {favoritesCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {favoritesCount}
              </Badge>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                <Filter size={16} />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Filter and sort products to find what you need
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={onCategoryChange}
                />
                <SortSelect value={sortBy} onChange={onSortChange} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <div className="flex-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
        <div className="flex-1">
          <SortSelect value={sortBy} onChange={onSortChange} />
        </div>
      </div>
    </div>
  );
}
