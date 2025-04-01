'use client';

import { FC, useState } from 'react';
import { useGetProductsQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { productColumns } from './productColumns';
import DataTable from '@/components/data-table';

const ProductsTable: FC<{ isManager: boolean }> = ({ isManager }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: productsData, refetch, isLoading } = useGetProductsQuery({});

  const filteredColumns = productColumns.filter((col) => {
    if (isManager) {
      return col.id !== 'actions' && col.id !== 'admin';
    } else {
      return col.id !== 'manager';
    }
  });

  const table = useReactTable({
    data: productsData?.products || [],
    columns: filteredColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы товаров...</div>
  ) : (
    <DataTable table={table} columns={filteredColumns} refetch={refetch} />
  );
};

export default ProductsTable;
