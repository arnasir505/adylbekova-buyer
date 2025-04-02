import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Order } from '@/types/order';

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'number',
    header: '#',
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: ({ row }) => <div>{row.original.firstName}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
    cell: ({ row }) => <div>{row.original.phone}</div>,
  },
  {
    accessorKey: 'city',
    header: 'Город / Село',
    cell: ({ row }) => <div>{row.original.city}</div>,
  },
  {
    accessorKey: 'totalItems',
    header: 'Кол-во товаров',
    cell: ({ row }) => <div>{row.original.totalItems}</div>,
  },
  {
    accessorKey: 'totalPrice',
    header: 'Сумма',
    cell: ({ row }) => <div>${row.original.totalPrice}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата',
    cell: ({ row }) => (
      <div>{dayjs(row.original.createdAt).format('DD.MM.YYYY')}</div>
    ),
  },
];
