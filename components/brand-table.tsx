'use client';

import { FC, useState } from 'react';
import { useGetBrandsQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { brandColumns } from './brandColumns';

const BrandsTable: FC<{ isManager: boolean }> = ({ isManager }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: brandsData, refetch, isLoading } = useGetBrandsQuery({});

  const filteredColumns = brandColumns.filter((col) => {
    if (isManager) {
      return col.id !== 'actions' && col.id !== 'admin';
    } else {
      return col.id !== 'manager';
    }
  });

  const table = useReactTable({
    data: brandsData?.brands || [],
    columns: filteredColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы брендов...</div>
  ) : (
    <DataTable table={table} columns={filteredColumns} refetch={refetch} />
  );
};

export default BrandsTable;
