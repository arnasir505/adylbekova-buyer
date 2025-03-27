'use client';

import { useGetProductByIdQuery } from '@/store/api';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeftIcon, Loader2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Icon } from '@/iconpack';
import { ProductCardSkeleton } from '@/components/ui/productCardSkeleton';
import { s3Loader } from '@/lib/utils';
import { useAppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { Color, Size } from '@/types/products';
import { addToCart } from '@/store/cart/cartSlice';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useParams();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(id as string);

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product && selectedSize && selectedColor) {
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

  if (isLoading) return <ProductCardSkeleton variant='full' />;
  if (error) return <p className='text-center mt-12'>Ошибка загрузки</p>;

  return (
    <div className='py-5 max-w-sm'>
      <div className='flex items-center gap-2'>
        <button onClick={() => router.back()} className='cursor-pointer'>
          <ChevronLeftIcon />
        </button>
        <h1 className='text-xl uppercase'>{product?.name}</h1>
      </div>
      {product?.imagesUrl[0] && (
        <Carousel className='w-full mt-4'>
          <CarouselContent>
            {product?.imagesUrl.map((imgUrl) => (
              <CarouselItem key={imgUrl}>
                <div className='h-[333px] w-full bg-product-bg'>
                  <Image
                    loader={s3Loader}
                    src={imgUrl}
                    alt={product.name}
                    width={362}
                    height={333}
                    className='h-full w-auto mx-auto object-cover'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-3 opacity-90 size-10' />
          <CarouselNext className='right-3 opacity-90 size-10' />
        </Carousel>
      )}
      <p className='text-xl text-copper mt-4'>${product?.price}</p>
      <p className='text-lg mt-3'>{product?.description}</p>
      <ul className='text-base mt-4'>
        <li>
          Материал:{' '}
          <span className='text-neutral-555'>{product?.material}</span>
        </li>
        <li>
          Цвета:{' '}
          {product?.colors.map((color, index) => (
            <div
              className='text-neutral-555 me-2 inline-flex items-center gap-2'
              key={color._id}
            >
              <span>{color.name}</span>
              <div
                className='h-4 w-4 inline-block outline-2'
                style={{ backgroundColor: color.hex }}
              ></div>
              {index !== product.colors.length - 1 && <span>,</span>}
            </div>
          ))}
        </li>
        <li>
          Размеры:{' '}
          <span className='text-neutral-555'>
            {product?.sizes.map((size) => size.value).join(', ')}
          </span>
        </li>
      </ul>
      <h2 className='text-xl mt-9 mb-4'>
        <Link href='/how-to-order' className='hover:underline decoration-1'>
          Как оформить заказ?
        </Link>
      </h2>
      <div className='max-w-sm'>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger disabled={loading} asChild>
            <Button className='w-full' size='xl'>
              {loading ? (
                <>
                  <Loader2 className='animate-spin' />
                </>
              ) : (
                <>
                  В корзину{' '}
                  <Icon
                    name='cart'
                    size='md'
                    height={28}
                    width={28}
                    color='white'
                  />
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
                {product?.sizes.map((size) => (
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
                {product?.colors.map((color) => (
                  <SelectItem value={JSON.stringify(color)} key={color._id}>
                    {color.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProductDetails;
