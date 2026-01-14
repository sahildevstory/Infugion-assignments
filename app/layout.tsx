import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Explorer | Browse Amazing Products',
  description: 'Discover and explore a curated collection of products with advanced filtering, search, and favorites.',
  openGraph: {
    title: 'Product Explorer',
    description: 'Discover and explore amazing products',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Explorer',
    description: 'Discover and explore amazing products',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
