import '@/app/globals.css';
import ReduxProvider from '@/providers/ReduxProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang='ru'>
        <body className='flex min-h-screen w-full flex-col'>
          <main>{children}</main>
        </body>
      </html>
    </ReduxProvider>
  );
}
