import type { Metadata } from 'next';
import { Cormorant_Garamond, Tenor_Sans } from 'next/font/google';
import '@/app/globals.css';

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
    <html lang='ru'>
      <body
        className={`${tenorSans.variable} ${cormorantGaramond.variable} font-tenor antialiased bg-[#1B1A19]`}
      >
        <main className='max-w-7xl mx-auto relative'>{children}</main>
      </body>
    </html>
  );
}
