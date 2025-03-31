import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Color } from '@/types/colors';
import { IconDotsVertical } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ColorTableCellViewer } from './color-table-cell-viewer';

export const colorColumns: ColumnDef<Color>[] = [
  {
    accessorKey: 'value',
    header: 'Название',
    cell: ({ row }) => <ColorTableCellViewer item={row.original} />,
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
