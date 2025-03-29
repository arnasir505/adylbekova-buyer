'use client';

import { useState } from 'react';
import { useGetProductsQuery } from '@/store/api';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { productColumns } from './productColumns';
import DataTable from '@/components/data-table';

const ProductsTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: productsData, isLoading } = useGetProductsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const table = useReactTable({
    data: productsData?.products || [],
    columns: productColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка товаров...</div>
  ) : (
    <DataTable table={table} columns={productColumns} />
  );
};

export default ProductsTable;
