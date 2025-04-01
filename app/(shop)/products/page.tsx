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
import { useIsMobile } from '@/hooks/use-mobile';

const MOBILE_LIMIT = 10;
const DESKTOP_LIMIT = 20;

export default function Products() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('q') || '';
  const isMobile = useIsMobile();
  const limit = isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT;

  const { data, error, isLoading } = useGetProductsQuery({
    page,
    limit,
    search: searchTerm,
  });

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (isLoading)
    return (
      <div className='grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 min-[440px]:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-12'>
        {Array.from({ length: limit }).map((_key, index) => (
          <ProductCardSkeleton key={index} variant='card' />
        ))}
      </div>
    );
  if (error) return <p className='text-center mt-12'>Ошибка загрузки</p>;

  return (
    <>
      {searchTerm && (
        <h2 className='text-center text-lg font-medium mt-6'>
          Результаты поиска: &quot;{searchTerm}&quot;
        </h2>
      )}

      {data?.products.length === 0 ? (
        <p className='text-center mt-12'>Ничего не найдено</p>
      ) : (
        <div className='grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 min-[440px]:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-12'>
          {data?.products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {(data?.totalPages ?? 1) > 1 && (
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
                  (pageNum === 2 && page > 4) ||
                  (pageNum === data.totalPages - 1 &&
                    page < data.totalPages - 3)
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
      )}
    </>
  );
}
