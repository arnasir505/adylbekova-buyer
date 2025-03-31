'use client';

import { useState } from 'react';
import { useGetCategoriesQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { categoryColumns } from './categoryColumns';

const CategoriesTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: categoryData, refetch, isLoading } = useGetCategoriesQuery({});

  const table = useReactTable({
    data: categoryData?.categories || [],
    columns: categoryColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы категорий...</div>
  ) : (
    <DataTable table={table} columns={categoryColumns} refetch={refetch} />
  );
};

export default CategoriesTable;
