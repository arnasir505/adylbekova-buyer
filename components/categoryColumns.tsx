import { Category } from '@/types/categories';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { CategoryTableCellViewer } from './category-table-cell-viewer';

export const categoryColumns: ColumnDef<Category>[] = [
  {
    id: 'admin',
    accessorKey: 'label',
    header: 'Название',
    cell: ({ row }) => <CategoryTableCellViewer item={row.original} />,
  },
  {
    id: 'manager',
    accessorKey: 'label',
    header: 'Название',
    cell: ({ row }) => <div className='py-1'>{row.original.label}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Название на английском',
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Создан',
    cell: ({ row }) => (
      <div>{dayjs(row.original.createdAt).format('DD.MM.YYYY')}</div>
    ),
  },
];
