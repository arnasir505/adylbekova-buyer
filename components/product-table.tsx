'use client';

import { useState } from 'react';
import { useGetProductsQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { productColumns } from './productColumns';
import DataTable from '@/components/data-table';

const ProductsTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: productsData, refetch, isLoading } = useGetProductsQuery({});

  const table = useReactTable({
    data: productsData?.products || [],
    columns: productColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы товаров...</div>
  ) : (
    <DataTable table={table} columns={productColumns} refetch={refetch} />
  );
};

export default ProductsTable;
