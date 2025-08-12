import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lost Items Platform - Find Your Lost Items',
  description: 'A community-driven platform to help you find lost items and connect with people who can help.',
  keywords: 'lost items, found items, community, help, search, lost and found',
  authors: [{ name: 'Lost Items Platform Team' }],
  robots: 'index, follow',
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://lost-items-frontend.vercel.app')
      : new URL('http://localhost:3000'),
  openGraph: {
    title: 'Lost Items Platform - Find Your Lost Items',
    description: 'A community-driven platform to help you find lost items and connect with people who can help.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lost Items Platform - Find Your Lost Items',
    description: 'A community-driven platform to help you find lost items and connect with people who can help.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
