'use client';

import { useState } from 'react';
import { useGetOrdersQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { orderColumns } from './orderColumns';
import { Input } from './ui/input';

const OrdersTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data: ordersData, refetch, isLoading } = useGetOrdersQuery();

  const table = useReactTable({
    data: ordersData || [],
    columns: orderColumns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { pagination, sorting, columnFilters },
  });

  return isLoading ? (
    <div>Загрузка таблицы заказов...</div>
  ) : (
    <>
      <div className='flex items-center pb-4'>
        <Input
          placeholder='Поиск по имени...'
          value={
            (table.getColumn('firstName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('firstName')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <DataTable table={table} columns={orderColumns} refetch={refetch} />
    </>
  );
};

export default OrdersTable;
