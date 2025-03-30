import '@/app/globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
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
          <SidebarProvider>
            <AppSidebar variant='inset' />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
          <Toaster position='top-center' />
        </body>
      </html>
    </ReduxProvider>
  );
}
