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
  const { data: brandsData, isLoading } = useGetBrandsQuery({});

  const table = useReactTable({
    data: brandsData?.brands || [],
    columns: brandColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка брендов...</div>
  ) : (
    <DataTable table={table} columns={brandColumns} />
  );
};

export default BrandsTable;
