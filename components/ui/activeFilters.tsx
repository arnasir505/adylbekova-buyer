'use client';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMenuItems } from '@/hooks/use-menu-items';

export const ActiveFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const menuItems = useMenuItems();

  const activeFilters = menuItems.flatMap((menuItem) => {
    const value = searchParams.get(menuItem.value);
    if (!value) return [];
    const item = menuItem.children.find((child) => child.value === value);
    return [
      {
        key: menuItem.value,
        groupLabel: menuItem.label,
        label: item?.label ?? '…',
      },
    ];
  });

  if (activeFilters.length === 0) return null;

  const removeFilters = (keys: string[]) => {
    const params = new URLSearchParams(searchParams);
    keys.forEach((key) => params.delete(key));
    params.delete('page');
    const query = params.toString();
    router.push(query ? `/products?${query}` : '/products', { scroll: false });
  };

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {activeFilters.map((filter) => (
        <button
          key={filter.key}
          type='button'
          onClick={() => removeFilters([filter.key])}
          aria-label={`Убрать фильтр ${filter.groupLabel}: ${filter.label}`}
          className='flex items-center gap-1.5 px-3 py-1 bg-[#888888]/10 text-neutral-555 hover:bg-[#888888]/20 transition-colors cursor-pointer'
        >
          <span className='text-sm'>{filter.groupLabel}:</span>
          <span className='text-sm font-medium text-neutral-333 capitalize'>
            {filter.label}
          </span>
          <X className='size-4' strokeWidth={1.5} />
        </button>
      ))}

      {activeFilters.length > 1 && (
        <button
          type='button'
          onClick={() => removeFilters(activeFilters.map((f) => f.key))}
          className='text-sm text-neutral-555 underline underline-offset-4 hover:text-neutral-333 cursor-pointer ms-1'
        >
          Сбросить все
        </button>
      )}
    </div>
  );
};
