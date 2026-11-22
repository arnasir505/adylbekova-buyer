'use client';

import { ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_SORT, SORT_OPTIONS } from '@/lib/constants';

export const SortSelect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = searchParams.get('sort') || DEFAULT_SORT;

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    // Keep the default out of the URL so plain /products stays canonical.
    if (e.target.value === DEFAULT_SORT) {
      params.delete('sort');
    } else {
      params.set('sort', e.target.value);
    }
    params.delete('page');
    const query = params.toString();
    router.push(query ? `/products?${query}` : '/products', { scroll: false });
  };

  // A native <select> gives phones their own picker and, unlike Radix
  // triggers, does not open on touchstart while the page is being scrolled.
  return (
    <label className='relative flex items-center gap-2 text-sm text-neutral-555 ms-auto'>
      <span className='hidden min-[400px]:inline'>Сортировка:</span>
      <select
        value={current}
        onChange={onChange}
        aria-label='Сортировка товаров'
        className='appearance-none bg-[#888888]/10 text-neutral-333 py-1 ps-3 pe-8 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-333/30'
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className='pointer-events-none absolute right-2 size-4'
        strokeWidth={1.5}
      />
    </label>
  );
};
