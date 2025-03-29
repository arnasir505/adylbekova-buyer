'use client';

import { useState } from 'react';
import { useGetColorsQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { colorColumns } from './colorColumns';

const ColorsTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: colorData, isLoading } = useGetColorsQuery({});

  const table = useReactTable({
    data: colorData?.colors || [],
    columns: colorColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка цветов...</div>
  ) : (
    <DataTable table={table} columns={colorColumns} />
  );
};

export default ColorsTable;
