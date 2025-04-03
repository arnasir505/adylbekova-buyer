import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Order } from '@/types/order';
import { OrderTableCellViewer } from './order-table-cell-viewer';
import { cn, translateOrderStatus } from '@/lib/utils';
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
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant='outline'
          className={cn(
            'max-w-ms text-wrap',
            status === 'pending' && 'text-blue-700',
            status === 'completed' && 'text-green-700',
            status === 'processing' && 'text-yellow-600',
            status === 'canceled' && 'text-red-700'
          )}
        >
          {translateOrderStatus(status)}
        </Badge>
      );
    },
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
