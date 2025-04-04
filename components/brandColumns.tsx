import { Brand } from '@/types/brands';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Image from 'next/image';
import { BrandTableCellViewer } from './brand-table-cell-viewer';

export const brandColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: 'imageUrl',
    header: '',
    cell: ({ row }) => {
      return (
        row.original.imageUrl && (
          <div className='h-[100px] w-[100px] relative mx-2'>
            <Image
              src={row.original.imageUrl}
              alt={row.original.name}
              className='object-cover rounded-md'
              fill
              sizes='(max-width: 400px) 100vw, (max-width: 640px) 50vw, 33vw'
            />
          </div>
        )
      );
    },
    enableHiding: false,
  },
  {
    id: 'admin',
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => <BrandTableCellViewer item={row.original} />,
  },
  {
    id: 'manager',
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => <div className='py-1'>{row.original.name}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Описание',
    cell: ({ row }) => (
      <div className='max-w-sm text-wrap'>{row.original.description}</div>
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
