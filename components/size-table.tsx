'use client';

import { useState } from 'react';
import { useGetSizesQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { sizeColumns } from './sizeColumns';

const SizesTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: sizeData, isLoading } = useGetSizesQuery({});

  const table = useReactTable({
    data: sizeData?.sizes || [],
    columns: sizeColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка размеров...</div>
  ) : (
    <DataTable table={table} columns={sizeColumns} />
  );
};

export default SizesTable;
