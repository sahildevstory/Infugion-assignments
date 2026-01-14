# Product Explorer Dashboard

A modern, production-ready product browsing application built with Next.js 13+ (App Router), TypeScript, and Tailwind CSS.

## Features

### Core Features
- **Product Listing Page** - Responsive grid layout with product cards displaying images, titles, prices, categories, and ratings
- **Search Functionality** - Real-time client-side search by product title and description
- **Category Filtering** - Filter products by category with a dropdown selector
- **Product Details Page** - Dedicated route (`/products/[id]`) with comprehensive product information
- **Favorites System** - Mark/unmark products as favorites with localStorage persistence
- **Loading States** - Skeleton loaders for better UX during data fetching
- **Error Handling** - Comprehensive error states with retry functionality
- **Empty States** - Clear messaging when no products match filters or no favorites exist

### Bonus Features
- **Dark Mode Toggle** - System-aware theme switching with smooth transitions
- **Sorting Options** - Sort by price (ascending/descending) or name (A-Z, Z-A)
- **Responsive Design** - Mobile-first approach, fully responsive across all devices
- **Accessibility** - ARIA labels, keyboard navigation support, semantic HTML
- **Optimized Images** - Next.js Image component for automatic optimization
- **TypeScript** - Fully typed with no `any` types (except justified cases)

## Tech Stack

- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Theme**: next-themes
- **Data Source**: FakeStore API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

### Type Checking

```bash
npm run typecheck
```

## Project Structure

```
project/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page with product listing
│   └── products/[id]/       # Dynamic product details route
│       └── page.tsx
├── components/              # Reusable React components
│   ├── ui/                  # shadcn/ui components
│   ├── category-filter.tsx
│   ├── empty-state.tsx
│   ├── error-state.tsx
│   ├── header.tsx
│   ├── loading-skeleton.tsx
│   ├── product-card.tsx
│   ├── product-filters.tsx
│   ├── product-grid.tsx
│   ├── providers.tsx
│   ├── search-bar.tsx
│   ├── sort-select.tsx
│   └── theme-toggle.tsx
├── hooks/                   # Custom React hooks
│   └── use-favorites.ts
├── lib/                     # Utility functions
│   ├── api.ts              # API integration
│   ├── favorites.ts        # localStorage favorites management
│   ├── filters.ts          # Product filtering and sorting logic
│   └── utils.ts            # General utilities
├── types/                   # TypeScript type definitions
│   └── product.ts
└── public/                  # Static assets
```

## Key Design Decisions

### Architecture

1. **Component Organization**: Components are split by responsibility - UI components, layout components, and feature components are clearly separated
2. **Type Safety**: All data structures are fully typed with TypeScript interfaces
3. **State Management**: React hooks for local state, custom hooks for shared logic (favorites)
4. **API Layer**: Centralized API functions with proper error handling and type safety
5. **Filtering Logic**: Separated business logic into pure functions for testability

### Performance Optimizations

1. **Image Optimization**: Using Next.js Image component with proper sizing hints
2. **API Caching**: Server-side data fetching with revalidation strategy
3. **Code Splitting**: Automatic with Next.js App Router
4. **Client-Side Filtering**: All filtering/sorting happens client-side for instant feedback

### UX Considerations

1. **Loading States**: Skeleton screens provide visual feedback during data fetching
2. **Error Recovery**: All error states include retry functionality
3. **Empty States**: Clear messaging guides users when filters yield no results
4. **Responsive Design**: Mobile-first approach ensures usability on all devices
5. **Accessibility**: Proper ARIA labels, semantic HTML, keyboard navigation

## Assumptions & Trade-offs

### Assumptions

1. **Data Source**: Using FakeStore API as specified - assumes consistent API availability
2. **Browser Support**: Modern browsers with ES6+ support
3. **User Flow**: Users primarily browse, search, and favorite products (no cart checkout implementation)

### Trade-offs

1. **Client-Side Filtering**: All filtering happens client-side for simplicity
   - **Pro**: Instant feedback, no network requests
   - **Con**: Not suitable for very large datasets (current dataset is small)

2. **localStorage for Favorites**: Using browser storage instead of database
   - **Pro**: No backend required, works offline
   - **Con**: Not synced across devices, cleared when cache is cleared

3. **No Pagination**: All products loaded at once
   - **Pro**: Simple implementation, fast filtering/sorting
   - **Con**: Would need pagination for larger datasets

4. **Mock Cart Functionality**: "Add to Cart" shows alert instead of full implementation
   - **Pro**: Focuses on assignment requirements
   - **Con**: Not production-ready for e-commerce

## Future Enhancements

If this were a real production application, I would add:

1. **Backend Integration**: Real API with authentication and user accounts
2. **Shopping Cart**: Full cart implementation with checkout flow
3. **Pagination**: Virtual scrolling or infinite scroll for large datasets
4. **Advanced Search**: Fuzzy search, search by multiple fields
5. **Product Comparison**: Compare multiple products side-by-side
6. **User Reviews**: Allow users to leave reviews and ratings
7. **Testing**: Unit tests (Jest), integration tests (Testing Library), E2E tests (Playwright)
8. **Analytics**: Track user behavior and optimize accordingly
9. **SEO**: Dynamic meta tags, structured data, sitemap
10. **Performance Monitoring**: Real user monitoring, error tracking

## API Reference

The application uses the [FakeStore API](https://fakestoreapi.com/):

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `GET /products/categories` - Fetch all categories

## License

This project was created as a technical assignment demonstration.
