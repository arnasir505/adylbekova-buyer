'use client';

import { FC, useState } from 'react';
import { useGetProductsQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { productColumns } from './productColumns';
import DataTable from '@/components/data-table';
import { Input } from './ui/input';

const ProductsTable: FC<{ isManager: boolean }> = ({ isManager }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { pagination, columnFilters },
  });

  return isLoading ? (
    <div>Загрузка таблицы товаров...</div>
  ) : (
    <>
      <div className='flex items-center pb-4'>
        <Input
          placeholder='Поиск по названию...'
          value={
            (table
              .getColumn(isManager ? 'manager' : 'admin')
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table
              .getColumn(isManager ? 'manager' : 'admin')
              ?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <DataTable table={table} columns={filteredColumns} refetch={refetch} />
    </>
  );
};

export default ProductsTable;
