'use client';

import OrdersTable from '@/components/order-table';
import { SiteHeader } from '@/components/site-header';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const { user } = useAppSelector(selectUser) || {};

  useEffect(() => {
    if (!user || !['admin', 'manager'].includes(user.role) || user.isBanned) {
      router.replace('/admin/login');
    }
  }, [user, router]);

  if (!user) return <div className='text-center py-10'>Загрузка...</div>;
  return (
    <>
      <SiteHeader title='Таблица заказов' />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main p-4'>
          <OrdersTable />
        </div>
      </div>
    </>
  );
};
export default Page;
