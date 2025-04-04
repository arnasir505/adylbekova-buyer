import { Color } from '@/types/colors';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ColorTableCellViewer } from './color-table-cell-viewer';

export const colorColumns: ColumnDef<Color>[] = [
  {
    id: 'admin',
    accessorKey: 'value',
    header: 'Название',
    cell: ({ row }) => <ColorTableCellViewer item={row.original} />,
  },
  {
    id: 'manager',
    accessorKey: 'value',
    header: 'Название',
    cell: ({ row }) => (
      <div className='me-2 inline-flex items-center gap-2 py-1'>
        <span>{row.original.name}</span>
        <div
          className='h-4 w-4 inline-block outline-2'
          style={{ backgroundColor: row.original.hex }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Создан',
    cell: ({ row }) => (
      <div>{dayjs(row.original.createdAt).format('DD.MM.YYYY')}</div>
    ),
  },
];
