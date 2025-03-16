'use client';

import { useGetProductsQuery } from '@/store/api';
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
import { ProductCard } from '@/components/ui/productCard';
import { ProductCardSkeleton } from '@/components/ui/productCardSkeleton';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Products() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const limit = 4;

  const { data, error, isLoading } = useGetProductsQuery({ page, limit });

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (isLoading)
    return (
      <div className='grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-12'>
        {[1, 2, 3, 4].map((key) => (
          <ProductCardSkeleton key={key} variant='card' />
        ))}
      </div>
    );
  if (error) return <p className='text-center mt-12'>Ошибка загрузки</p>;

  return (
    <>
      <div className='grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-12'>
        {data?.products?.map(({ _id, imagesUrl, name, price, description }) => (
          <ProductCard
            key={_id}
            _id={_id}
            imagesUrl={imagesUrl}
            name={name}
            price={price}
            description={description}
          />
        ))}
      </div>
      <Pagination className='mt-8 flex justify-center'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(Math.max(page - 1, 1))}
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
              onClick={() => setPage(Math.min(page + 1, data!.totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
