'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/user/userSlice';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsTable from '@/components/product-table';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAppSelector(selectUser) || {};
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    if (!user || !['admin', 'manager'].includes(user.role)) {
      router.replace('/admin/login');
    }
  }, [user, router]);

  if (!user) return <div>Загрузка...</div>;

  // const productsTable = useReactTable({
  //   data: productsData?.products || [],
  //   columns: productColumns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  // const brandsTable = useReactTable({
  //   data: brandsData || [],
  //   columns: brandColumns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  // const categoriesTable = useReactTable({
  //   data: categoriesData || [],
  //   columns: categoryColumns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>
          <div className='p-4'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='flex w-full flex-col justify-start gap-6'
            >
              <div className='flex items-center justify-between'>
                <Select value={activeTab} onValueChange={setActiveTab}>
                  <SelectTrigger className='@4xl/main:hidden flex w-fit'>
                    <SelectValue placeholder='Выбрать таблицу' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='products'>Товары</SelectItem>
                    <SelectItem value='brands'>Бренды</SelectItem>
                    <SelectItem value='categories'>Категории</SelectItem>
                  </SelectContent>
                </Select>
                <TabsList className='hidden @4xl/main:flex gap-1'>
                  <TabsTrigger value='products'>Товары</TabsTrigger>
                  <TabsTrigger value='brands'>Бренды</TabsTrigger>
                  <TabsTrigger value='categories'>Категории</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value='products'>
                {activeTab === 'products' && <ProductsTable />}
              </TabsContent>
              {/* <TabsContent value='brands'>
              {activeTab === 'brands' && <BrandsTable />}
            </TabsContent>
            <TabsContent value='categories'>
              {activeTab === 'categories' && <CategoriesTable />}
            </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
