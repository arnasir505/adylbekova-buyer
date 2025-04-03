import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Order } from '@/types/order';
import { OrderTableCellViewer } from './order-table-cell-viewer';
import { translateOrderStatus } from '@/lib/utils';
import { Badge } from './ui/badge';

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'number',
    header: '# Номер заказа',
    cell: ({ row }) => <OrderTableCellViewer item={row.original} />,
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
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>{row.original.email}</div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>{row.original.phone}</div>
    ),
  },
  {
    accessorKey: 'city',
    header: 'Город / Село',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>{row.original.city}</div>
    ),
  },
  {
    accessorKey: 'totalItems',
    header: 'Кол-во товаров',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>{row.original.totalItems}</div>
    ),
  },
  {
    accessorKey: 'totalPrice',
    header: 'Сумма',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>${row.original.totalPrice}</div>
    ),
  },
  {
    accessorKey: 'manager',
    header: 'Менеджер',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>{row.original.manager.name}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge variant='outline' className='max-w-ms text-wrap'>
        {translateOrderStatus(row.original.status)}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>
        {dayjs(row.original.createdAt).format('DD.MM.YYYY')}
      </div>
    ),
  },
];
