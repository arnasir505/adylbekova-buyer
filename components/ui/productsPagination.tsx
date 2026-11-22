'use client';

import { MouseEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from './pagination';
import { cn } from '@/lib/utils';

interface Props {
  page: number;
  totalPages: number;
}

export const ProductsPagination = ({ page, totalPages }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Real hrefs so search engines can crawl every page of the catalogue.
  const hrefFor = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    if (pageNum <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(pageNum));
    }
    const query = params.toString();
    return query ? `/products?${query}` : '/products';
  };

  const linkProps = (pageNum: number) => ({
    href: hrefFor(pageNum),
    onClick: (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      router.push(hrefFor(pageNum), { scroll: false });
    },
  });

  return (
    <Pagination className='mt-8 flex justify-center'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious {...linkProps(Math.max(page - 1, 1))} />
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isFirst = pageNum === 1;
          const isLast = pageNum === totalPages;
          const isNearCurrent = Math.abs(page - pageNum) <= 1;

          if (isFirst || isLast || isNearCurrent) {
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={page === pageNum}
                  {...linkProps(pageNum)}
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
          }
          if (
            (pageNum === 2 && page > 4) ||
            (pageNum === totalPages - 1 && page < totalPages - 3)
          ) {
            return <PaginationEllipsis key={pageNum} />;
          }
          return null;
        })}

        <PaginationItem>
          <PaginationNext {...linkProps(Math.min(page + 1, totalPages))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
