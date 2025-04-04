import { Size } from '@/types/sizes';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { SizeTableCellViewer } from './size-table-cell-viewer';

export const sizeColumns: ColumnDef<Size>[] = [
  {
    id: 'admin',
    accessorKey: 'value',
    header: 'Размер',
    cell: ({ row }) => <SizeTableCellViewer item={row.original} />,
  },
  {
    id: 'manager',
    accessorKey: 'value',
    header: 'Размер',
    cell: ({ row }) => <div className='py-1'>{row.original.value}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Создан',
    cell: ({ row }) => (
      <div>{dayjs(row.original.createdAt).format('DD.MM.YYYY')}</div>
    ),
  },
];
