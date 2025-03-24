import type { Metadata } from 'next';
import { Cormorant_Garamond, Tenor_Sans } from 'next/font/google';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import ReduxProvider from '@/providers/ReduxProvider';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';

const tenorSans = Tenor_Sans({
  variable: '--font-tenor-sans',
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
});

export const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Adylbekova Buyer',
  description: 'Luxury replicas of premium brands',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang='en'>
        <body
          className={`${tenorSans.variable} ${cormorantGaramond.variable} font-tenor antialiased bg-body pb-5`}
        >
          <main className='max-w-7xl mx-auto px-5'>
            <Navbar />
            {children}
          </main>
          <Toaster richColors position='top-center'/>
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
}
