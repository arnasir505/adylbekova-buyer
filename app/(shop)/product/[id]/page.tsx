'use client';

import { useGetProductByIdQuery } from '@/store/api';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeftIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Icon } from '@/iconpack';
import { ProductCardSkeleton } from '@/components/ui/productCardSkeleton';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(id as string);

  if (isLoading) return <ProductCardSkeleton variant='full' />;
  if (error) return <p className='text-center mt-12'>Ошибка загрузки</p>;

  return (
    <div className='py-5 max-w-sm'>
      <div className='flex items-center gap-2'>
        <button onClick={() => router.back()} className='cursor-pointer'>
          <ChevronLeftIcon />
        </button>
        <h1 className='text-xl uppercase'>{product?.name}</h1>
      </div>
      {product?.imagesUrl[0] && (
        <Carousel className='w-full mt-4'>
          <CarouselContent>
            {product?.imagesUrl.map((imgUrl) => (
              <CarouselItem key={imgUrl}>
                <div className='h-[333px] w-full bg-product-bg'>
                  <Image
                    src={imgUrl}
                    alt={product.name}
                    width={362}
                    height={333}
                    className='h-full w-auto mx-auto object-cover'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-3 opacity-90 size-10' />
          <CarouselNext className='right-3 opacity-90 size-10' />
        </Carousel>
      )}
      <p className='text-xl text-copper mt-4'>${product?.price}</p>
      <p className='text-lg mt-3'>{product?.description}</p>
      <ul className='text-base mt-4'>
        <li>
          Материал:{' '}
          <span className='text-neutral-555'>{product?.material}</span>
        </li>
        <li>
          Цвета:{' '}
          {product?.colors.map((color) => (
            <div
              className='text-neutral-555 pe-3 inline-flex items-center gap-2'
              key={color._id}
            >
              <span>{color.name}</span>
              <div
                className='h-4 w-4 inline-block outline-2'
                style={{ backgroundColor: color.hex }}
              ></div>
            </div>
          ))}
        </li>
        <li>
          Размеры: <span className='text-neutral-555'>{product?.sizes}</span>
        </li>
      </ul>
      <h2 className='text-xl mt-9 mb-4'>Как оформить заказ?</h2>
      <div className='max-w-sm'>
        <button className='btn-base-lg'>
          В корзину{' '}
          <Icon name='cart' size='md' height={28} width={28} color='white' />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
