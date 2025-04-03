'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Order } from '@/types/order';
import dayjs from 'dayjs';
import Link from 'next/link';
import { translateOrderStatus } from '@/lib/utils';

export function OrderTableCellViewer({ item }: { item: Order }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant='link' className='text-foreground w-fit px-0 text-left'>
          {item.orderNumber}
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Детали заказа</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4'>
          <div className='space-y-4'>
            <h1 className='text-lg font-semibold text-gray-800'>
              Заказ <span className='text-blue-600'>№{item.orderNumber}</span>
            </h1>

            <div className='bg-gray-50 p-3 rounded-md space-y-2 flex flex-col'>
              <p>
                <span className='font-medium'>{item.firstName}</span>
              </p>
              <Link href={`tel:${item.phone}`}>📞 {item.phone}</Link>
              <Link href={`mailto:${item.email}`}>✉️ {item.email}</Link>
              <p>
                📍 {item.country}, {item.city}, {item.address}
              </p>
              <p>{item.orderDetails}</p>
            </div>

            <div className='flex justify-between items-center text-gray-700'>
              <p className='font-medium text-lg'>💰 ${item.totalPrice}</p>
              <p>🕒 {dayjs(item.createdAt).format('DD.MM.YYYY')}</p>
            </div>

            <div className='bg-gray-50 p-3 rounded-md'>
              <p className='font-medium mb-2'>🛒 Товары ({item.totalItems}):</p>
              <ul className='space-y-1 text-gray-600 ps-2'>
                {item.products.map((prod) => (
                  <li
                    key={`${prod.product._id}-${prod.color._id}-${prod.size._id}`}
                  >
                    <span className='font-medium text-gray-800'>
                      {prod.product.name}
                    </span>
                    <span className='text-sm text-gray-500'>
                      {' '}
                      ({prod.size.value}, {prod.color.name})
                    </span>
                    — <span className='font-semibold'>{prod.quantity} шт.</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className='text-gray-700'>
              Статус:{' '}
              <span className='font-medium text-blue-600'>
                {translateOrderStatus(item.status)}
              </span>
            </p>

            <div className='flex gap-2 mt-3'>
              <Button>Подтвердить</Button>
              <Button variant='destructive'>Отменить</Button>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline' className='rounded-lg'>
              Закрыть
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
