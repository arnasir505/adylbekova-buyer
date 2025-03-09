'use client';

import Image from 'next/image';
import { useGetProductsQuery } from './store/api';
import { Icon } from './iconpack';

export default function Home() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;

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
