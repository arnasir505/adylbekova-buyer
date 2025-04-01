'use client';

import { SiteHeader } from '@/components/site-header';
import UsersTable from '@/components/user-table';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const { user } = useAppSelector(selectUser) || {};

  useEffect(() => {
    if (!user || !['admin', 'manager'].includes(user.role)) {
      router.replace('/admin/login');
    }
  }, [user, router]);

  if (!user) return <div className='text-center py-10'>Загрузка...</div>;
  return (
    <>
      <SiteHeader title='Таблица пользователей' />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main p-4'>
          <UsersTable />
        </div>
      </div>
    </>
  );
};
export default Page;
