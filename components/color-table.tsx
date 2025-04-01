'use client';

import { FC, useState } from 'react';
import { useGetColorsQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { colorColumns } from './colorColumns';

const ColorsTable: FC<{ isManager: boolean }> = ({ isManager }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: colorData, refetch, isLoading } = useGetColorsQuery({});

  const filteredColumns = colorColumns.filter((col) => {
    if (isManager) {
      return col.id !== 'actions' && col.id !== 'admin';
    } else {
      return col.id !== 'manager';
    }
  });

  const table = useReactTable({
    data: colorData?.colors || [],
    columns: filteredColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы цветов...</div>
  ) : (
    <DataTable table={table} columns={filteredColumns} refetch={refetch} />
  );
};

export default ColorsTable;
