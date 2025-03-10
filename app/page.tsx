'use client';

import Image from 'next/image';
import { Icon } from '../iconpack';
import { useGetProductsQuery } from '@/store/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  if (isLoading)
    return (
      <div className='grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-12'>
        {[1, 2, 3, 4].map((v) => (
          <div className='min-w-[171px] space-y-2' key={v}>
            <Skeleton className='h-[228px] w-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-10' />
              <Skeleton className='h-4 w-full' />
            </div>
          </div>
        ))}
      </div>
    );
  if (error) return <p className='text-center mt-12'>Ошибка загрузки</p>;

  return (
    <div className='grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-12'>
      {products?.map(({ _id, imagesUrl, name, price, description }) => (
        <div key={_id} className='min-w-[171px]'>
          <div className='bg-[#E8E5DC] h-[228px] relative'>
            <Image
              src={imagesUrl[0]}
              alt={name}
              className='object-cover'
              fill
              sizes='(max-width: 400px) 100vw, (max-width: 640px) 50vw, 33vw'
            />
          </div>
          <p className='text-copper text-base leading-7'>{price}$</p>
          <h2 className='uppercase truncate'>{name}</h2>
          <p className='text-sm leading-5 truncate text-neutral-550 mb-2'>
            {description}
          </p>
          <button className='btn-base'>
            В корзину <Icon name='cart' size='md' color='white' />
          </button>
        </div>
      ))}
    </div>
  );
}
