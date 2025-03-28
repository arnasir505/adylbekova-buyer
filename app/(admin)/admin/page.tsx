'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/user/userSlice';

const Dashboard = () => {
  const router = useRouter();
  const response = useAppSelector(selectUser);
  const user = response?.user;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!user || !['admin', 'manager'].includes(user.role)) {
      router.replace('/admin/login');
    }
  }, [user, router]);

  if (!isClient) return null;

  if (!user) return <div>Загрузка...</div>;

  return <div>Dashboard for {user.name}</div>;
};

export default Dashboard;
