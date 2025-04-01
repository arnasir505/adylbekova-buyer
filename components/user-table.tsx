'use client';

import { useState } from 'react';
import { useGetUsersQuery } from '@/store/api';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DataTable from '@/components/data-table';
import { userColumns } from './userColumns';

const UsersTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data: usersData, refetch, isLoading } = useGetUsersQuery({});

  const table = useReactTable({
    data: usersData?.users || [],
    columns: userColumns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return isLoading ? (
    <div>Загрузка таблицы пользователей...</div>
  ) : (
    <DataTable table={table} columns={userColumns} refetch={refetch} />
  );
};

export default UsersTable;
