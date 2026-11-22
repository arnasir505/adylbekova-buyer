import { useGetBrandsQuery, useGetCategoriesQuery } from '@/store/api';
import { MenuItem } from '@/types/categories';
import { useMemo } from 'react';

export const useMenuItems = (): MenuItem[] => {
  const { data: brands } = useGetBrandsQuery({});
  const { data: categories } = useGetCategoriesQuery({});

  return useMemo<MenuItem[]>(
    () => [
      {
        label: 'Бренд',
        value: 'brand',
        children: (brands?.brands ?? []).map((brand) => ({
          label: brand.name,
          value: brand._id,
        })),
      },
      {
        label: 'Категории',
        value: 'category',
        children: (categories?.categories ?? []).map((category) => ({
          label: category.label,
          value: category._id,
        })),
      },
    ],
    [brands?.brands, categories?.categories]
  );
};
