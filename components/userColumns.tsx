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
import { FC } from 'react';
import { useToggleBanUserMutation } from '@/store/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const UserActions: FC<{ item: User }> = ({ item }) => {
  const [toggleBanUser, { isLoading }] = useToggleBanUserMutation();

  const toggle = async () => {
    try {
      const user = await toggleBanUser(item._id).unwrap();
      toast.success(
        user.isBanned
          ? `Менеджер ${item.name} заблокирован`
          : `Менеджер ${item.name} разблокирован`
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
        <DropdownMenuItem
          variant={item.isBanned ? 'default' : 'destructive'}
          onClick={toggle}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : item.isBanned ? (
            'Разблокировать'
          ) : (
            'Заблокировать'
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'number',
    header: '#',
    cell: ({ row }) => <div>{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: ({ row }) => <div className='py-2'>{row.original.name}</div>,
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
      <Badge variant='outline'>
        {row.original.role === 'manager' ? 'Менеджер' : 'Админ'}
      </Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) =>
      row.original.isBanned && (
        <Badge variant='outline' className='capitalize text-red-700'>
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
    cell: ({ row }) =>
      row.original.role === 'manager' && <UserActions item={row.original} />,
  },
];
