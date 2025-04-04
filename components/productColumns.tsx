import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/types/products';
import { IconDotsVertical } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Image from 'next/image';
import { ProductTableCellViewer } from '@/components/product-table-cell-viewer';
import { useToggleArchiveProductMutation } from '@/store/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { FC } from 'react';
import { cn } from '@/lib/utils';

const ProductActions: FC<{ item: Product }> = ({ item }) => {
  const [toggleArchiveProduct, { isLoading }] =
    useToggleArchiveProductMutation();

  const toggle = async () => {
    try {
      const product = await toggleArchiveProduct(item._id).unwrap();
      toast.success(
        product.isAvailable
          ? `Товар ${item.name} снова доступен`
          : `Товар ${item.name} помещен в архив`
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
        <DropdownMenuItem onClick={toggle} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : item.isAvailable ? (
            'В архив'
          ) : (
            'Убрать из архива'
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>Удалить</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'imagesUrl',
    header: '',
    cell: ({ row }) => {
      return (
        row.original.imagesUrl[0] && (
          <div className='h-[100px] w-[100px] relative mx-2'>
            <Image
              src={row.original.imagesUrl[0]}
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
    id: 'manager',
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => <div className='py-2'>{row.original.name}</div>,
  },
  {
    id: 'admin',
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => <ProductTableCellViewer item={row.original} />,
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className={cn(
          'capitalize',
          row.original.isAvailable ? 'text-green-700' : 'text-red-700'
        )}
      >
        {row.original.isAvailable ? 'активен' : 'в архиве'}
      </Badge>
    ),
  },
  {
    accessorKey: 'brand',
    header: 'Бренд',
    cell: ({ row }) => <div>{row.original.brand.name}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Цена',
    cell: ({ row }) => <div>${row.original.price}</div>,
  },
  {
    accessorKey: 'discount',
    header: 'Скидка',
    cell: ({ row }) => (
      <div>{row.original.discount && `$${row.original.discount}`}</div>
    ),
  },
  {
    accessorKey: 'colors',
    header: 'Цвета',
    cell: ({ row }) => (
      <div className='flex flex-col gap-2'>
        {row.original.colors.map((color) => (
          <div key={color._id} className='me-2 inline-flex items-center gap-2'>
            <span>{color.name}</span>
            <div
              className='h-4 w-4 inline-block outline-2'
              style={{ backgroundColor: color.hex }}
            />
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'sizes',
    header: 'Размеры',
    cell: ({ row }) => (
      <div className='max-w-ms text-wrap'>
        {row.original.sizes.map((size) => size.value).join(', ')}
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
  {
    id: 'actions',
    cell: ({ row }) => <ProductActions item={row.original} />,
  },
];
