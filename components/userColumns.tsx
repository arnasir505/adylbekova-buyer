import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconDotsVertical } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { User } from '@/types/user';
import { Badge } from './ui/badge';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'number',
    header: '#',
    cell: ({ row }) => <div>{row.id}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: 'phone',
    header: 'Номер телефона',
    cell: ({ row }) => <div>{row.original.phone}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Роль',
    cell: ({ row }) => (
      <Badge className='capitalize'>{row.original.role}</Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) =>
      row.original.isBanned && (
        <Badge variant='destructive' className='capitalize'>
          Заблокирован
        </Badge>
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
          <DropdownMenuItem variant='destructive'>
            Заблокировать
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
