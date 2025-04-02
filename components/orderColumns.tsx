import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Order } from '@/types/order';

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'number',
    header: '# Номер заказа',
    cell: ({ row }) => <div>{row.original.orderNumber}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>{row.original.firstName}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className='max-w-ms text-wrap'>{row.original.email}</div>,
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
    cell: ({ row }) => <div className='max-w-ms text-wrap'>{row.original.phone}</div>,
  },
  {
    accessorKey: 'city',
    header: 'Город / Село',
    cell: ({ row }) => <div className='max-w-ms text-wrap'>{row.original.city}</div>,
  },
  {
    accessorKey: 'totalItems',
    header: 'Кол-во товаров',
    cell: ({ row }) => <div className='max-w-ms text-wrap'>{row.original.totalItems}</div>,
  },
  {
    accessorKey: 'totalPrice',
    header: 'Сумма',
    cell: ({ row }) => <div className='max-w-ms text-wrap'>${row.original.totalPrice}</div>,
  },
  {
    accessorKey: 'manager',
    header: 'Менеджер',
    cell: ({ row }) => <div className='max-w-ms text-wrap'>{row.original.manager.name}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => <div className='max-w-ms text-wrap'>{row.original.status}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>{dayjs(row.original.createdAt).format('DD.MM.YYYY')}</div>
    ),
  },
];
