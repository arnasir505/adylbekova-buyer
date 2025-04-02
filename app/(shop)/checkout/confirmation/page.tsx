'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ConfirmationPage = () => {
  const params = useSearchParams();
  const orderNumber = params.get('orderNumber');

  return (
    <div className='flex flex-col items-center justify-center my-20 p-5'>
      <h1 className='text-3xl font-bold'>Спасибо за ваш заказ!</h1>
      <p className='text-lg mt-3'>
        Менеджер свяжется с вами в ближайшее время.
      </p>
      {orderNumber && (
        <p className='mt-2 text-gray-600'>
          Номер заказа: <strong>{orderNumber}</strong>
        </p>
      )}
      <Button className='mt-8' asChild>
        <Link href='/products'>Вернуться на главную</Link>
      </Button>
    </div>
  );
};

export default ConfirmationPage;
