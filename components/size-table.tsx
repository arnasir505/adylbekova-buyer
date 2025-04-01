'use client';

import { FC, useState } from 'react';
import { useGetSizesQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { sizeColumns } from './sizeColumns';

const SizesTable: FC<{ isManager: boolean }> = ({ isManager }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: sizeData, refetch, isLoading } = useGetSizesQuery({});

  const filteredColumns = sizeColumns.filter((col) => {
    if (isManager) {
      return col.id !== 'actions' && col.id !== 'admin';
    } else {
      return col.id !== 'manager';
    }
  });

  const table = useReactTable({
    data: sizeData?.sizes || [],
    columns: filteredColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы размеров...</div>
  ) : (
    <DataTable table={table} columns={filteredColumns} refetch={refetch} />
  );
};

export default SizesTable;
