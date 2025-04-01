'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/iconpack';
import Link from 'next/link';
import { useAppDispatch } from '@/store';
import { addToCart } from '@/store/cart/cartSlice';
import { Product } from '@/types/products';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './button';
import { Size } from '@/types/sizes';
import { Color } from '@/types/colors';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedSize && selectedColor) {
      setLoading(true);
      setTimeout(() => {
        dispatch(
          addToCart({ product, size: selectedSize, color: selectedColor })
        );

        setSelectedSize(null);
        setSelectedColor(null);
        setIsOpen(false);
        setLoading(false);
        toast.success('Добавлено в корзину', { duration: 2000 });
      }, 500);
    }
  }, [selectedSize, selectedColor, dispatch, product]);

  return (
    <div className='flex flex-col justify-between'>
      <Link href={`/product/${product._id}`}>
        <div className='bg-product-bg h-[228px] relative'>
          {product.imagesUrl[0] && (
            <Image
              src={product.imagesUrl[0]}
              alt={product.name}
              className='object-cover'
              fill
              sizes='(max-width: 400px) 100vw, (max-width: 640px) 50vw, 33vw'
            />
          )}
        </div>
        <p className='text-copper text-base leading-7'>
          ${product.price - (product.discount ?? 0)}
          {product.discount && (
            <span className='text-neutral-400 ms-2 line-through decoration-1'>
              ${product.price}
            </span>
          )}
        </p>
        <h2 className='uppercase truncate'>{product.name}</h2>
        <p className='text-sm leading-5 truncate text-neutral-555 mb-2'>
          {product.description}
        </p>
      </Link>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild disabled={loading || !product.isAvailable}>
          <Button className='w-full'>
            {loading ? (
              <>
                <Loader2 className='animate-spin' />
              </>
            ) : (
              <>
                В корзину <Icon name='cart' size='md' color='white' />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Выберите размер:</DropdownMenuLabel>
          <Select
            value={selectedSize ? JSON.stringify(selectedSize) : ''}
            onValueChange={(value) => setSelectedSize(JSON.parse(value))}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Размер' />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem value={JSON.stringify(size)} key={size._id}>
                  {size.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenuLabel>Выберите цвет:</DropdownMenuLabel>
          <Select
            value={selectedColor ? JSON.stringify(selectedColor) : ''}
            onValueChange={(value) => setSelectedColor(JSON.parse(value))}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Цвет' />
            </SelectTrigger>
            <SelectContent>
              {product.colors.map((color) => (
                <SelectItem value={JSON.stringify(color)} key={color._id}>
                  {color.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { ProductCard };
