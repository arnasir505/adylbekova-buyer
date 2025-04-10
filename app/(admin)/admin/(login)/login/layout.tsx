import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';
import ReduxProvider from '@/providers/ReduxProvider';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang='ru'>
        <body className='flex min-h-screen w-full flex-col'>
          <Suspense>
            <main>{children}</main>
            <Toaster position='top-center' richColors />
          </Suspense>
        </body>
      </html>
    </ReduxProvider>
  );
}
