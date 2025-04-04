'use client';

import { FC, useState } from 'react';
import { useGetUsersQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { userColumns } from './userColumns';

const UsersTable: FC<{ isManager: boolean }> = ({ isManager }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: usersData, refetch, isLoading } = useGetUsersQuery({});

  const filteredColumns = userColumns.filter((col) => {
    if (isManager) {
      return col.id !== 'actions';
    } else {
      return true;
    }
  });

  const table = useReactTable({
    data: usersData?.users || [],
    columns: filteredColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы пользователей...</div>
  ) : (
    <DataTable table={table} columns={filteredColumns} refetch={refetch} />
  );
};

export default UsersTable;
