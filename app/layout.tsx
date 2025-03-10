import type { Metadata } from 'next';
import { Cormorant_Garamond, Tenor_Sans } from 'next/font/google';
import ReduxProvider from '../providers/ReduxProvider';
import './globals.css';
import { Navbar } from '@/components/ui/navbar';

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
          className={`${tenorSans.variable} ${cormorantGaramond.variable} font-tenor antialiased px-5 bg-body max-w-7xl mx-auto pb-5`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
