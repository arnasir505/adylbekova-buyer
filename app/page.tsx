'use client';

import Image from 'next/image';
import { Icon } from '../iconpack';
import { useGetProductsQuery } from '@/store/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 4;
  const { data, error, isLoading } = useGetProductsQuery({ page, limit });
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
    <>
      <div className='grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-12'>
        {data?.products?.map(({ _id, imagesUrl, name, price, description }) => (
          <div key={_id} className='min-w-[171px]'>
            <div className='bg-[#E8E5DC] h-[228px] relative'>
              {imagesUrl[0] && (
                <Image
                  src={imagesUrl[0]}
                  alt={name}
                  className='object-cover'
                  fill
                  sizes='(max-width: 400px) 100vw, (max-width: 640px) 50vw, 33vw'
                />
              )}
            </div>
            <p className='text-copper text-base leading-7'>${price}</p>
            <h2 className='uppercase truncate'>{name}</h2>
            <p className='text-sm leading-5 truncate text-neutral-555 mb-2'>
              {description}
            </p>
            <button className='btn-base'>
              В корзину <Icon name='cart' size='md' color='white' />
            </button>
          </div>
        ))}
      </div>
      <Pagination className='mt-8 flex justify-center'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {data?.totalPages &&
            [...Array(data.totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isFirst = pageNum === 1;
              const isLast = pageNum === data.totalPages;
              const isNearCurrent = Math.abs(page - pageNum) <= 1;
              const shouldShow = isFirst || isLast || isNearCurrent;

              if (shouldShow) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={page === pageNum}
                      onClick={() => setPage(pageNum)}
                      className={cn(
                        page === pageNum
                          ? 'bg-neutral-333 text-[#FCFCFC]'
                          : 'bg-[#888888]/10 text-neutral-555',
                        'text-base rounded-none'
                      )}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                (pageNum === 2 && page > 4) || // Левая сторона
                (pageNum === data.totalPages - 1 && page < data.totalPages - 3) // Правая сторона
              ) {
                return <PaginationEllipsis key={pageNum} />;
              }
            })}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, data!.totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
