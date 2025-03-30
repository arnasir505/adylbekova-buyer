import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Brand } from '@/types/brands';
import { IconDotsVertical } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Image from 'next/image';

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
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => <div>{row.original.name}</div>,
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
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
            size='icon'
          >
            <IconDotsVertical />
            <span className='sr-only'>Открыть меню</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          <DropdownMenuItem variant='destructive'>Удалить</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
