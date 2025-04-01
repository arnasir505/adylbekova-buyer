'use client';

import { FC, useState } from 'react';
import { useGetCategoriesQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { categoryColumns } from './categoryColumns';

const CategoriesTable: FC<{ isManager: boolean }> = ({ isManager }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: categoryData, refetch, isLoading } = useGetCategoriesQuery({});

  const filteredColumns = categoryColumns.filter((col) => {
    if (isManager) {
      return col.id !== 'actions' && col.id !== 'admin';
    } else {
      return col.id !== 'manager';
    }
  });

  const table = useReactTable({
    data: categoryData?.categories || [],
    columns: filteredColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы категорий...</div>
  ) : (
    <DataTable table={table} columns={filteredColumns} refetch={refetch} />
  );
};

export default CategoriesTable;
