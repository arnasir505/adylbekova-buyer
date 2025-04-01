'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/user/userSlice';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsTable from '@/components/product-table';
import BrandsTable from '@/components/brand-table';
import CategoriesTable from '@/components/category-table';
import SizesTable from '@/components/size-table';
import ColorsTable from '@/components/color-table';
import { SiteHeader } from '@/components/site-header';

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAppSelector(selectUser) || {};
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    if (!user || !['admin', 'manager'].includes(user.role)) {
      router.replace('/admin/login');
    }
  }, [user, router]);

  if (!user) return <div className='text-center py-10'>Загрузка...</div>;

  const isManager = user.role === 'manager';

  return (
    <>
      <SiteHeader title='Панель управления' />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main p-4'>
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
                  <SelectItem value='sizes'>Размеры</SelectItem>
                  <SelectItem value='colors'>Цвета</SelectItem>
                </SelectContent>
              </Select>
              <TabsList className='hidden @4xl/main:flex gap-1'>
                <TabsTrigger value='products'>Товары</TabsTrigger>
                <TabsTrigger value='brands'>Бренды</TabsTrigger>
                <TabsTrigger value='categories'>Категории</TabsTrigger>
                <TabsTrigger value='sizes'>Размеры</TabsTrigger>
                <TabsTrigger value='colors'>Цвета</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value='products'>
              {activeTab === 'products' && (
                <ProductsTable isManager={isManager} />
              )}
            </TabsContent>
            <TabsContent value='brands'>
              {activeTab === 'brands' && <BrandsTable isManager={isManager} />}
            </TabsContent>
            <TabsContent value='categories'>
              {activeTab === 'categories' && (
                <CategoriesTable isManager={isManager} />
              )}
            </TabsContent>
            <TabsContent value='sizes'>
              {activeTab === 'sizes' && <SizesTable isManager={isManager} />}
            </TabsContent>
            <TabsContent value='colors'>
              {activeTab === 'colors' && <ColorsTable isManager={isManager} />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
