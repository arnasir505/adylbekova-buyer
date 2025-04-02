'use client';

import { useState } from 'react';
import { useGetOrdersQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { orderColumns } from './orderColumns';

const OrdersTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: ordersData, refetch, isLoading } = useGetOrdersQuery();

  const table = useReactTable({
    data: ordersData || [],
    columns: orderColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы заказов...</div>
  ) : (
    <DataTable table={table} columns={orderColumns} refetch={refetch} />
  );
};

export default OrdersTable;
