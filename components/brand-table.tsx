'use client';

import { useState } from 'react';
import { useGetBrandsQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { brandColumns } from './brandColumns';

const BrandsTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: brandsData, refetch, isLoading } = useGetBrandsQuery({});

  const table = useReactTable({
    data: brandsData?.brands || [],
    columns: brandColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы брендов...</div>
  ) : (
    <DataTable table={table} columns={brandColumns} refetch={refetch} />
  );
};

export default BrandsTable;
