import { CartItem as ICartItem } from '@/types/cart';
import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/store';
import {
  deleteFromCart,
  inputToCart,
  minusOneFromCart,
  plusOneToCart,
} from '@/store/cart/cartSlice';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface Props {
  item: ICartItem;
  variant?: 'lg';
}

export const CartItem: FC<Props> = ({ item, variant }) => {
  const dispatch = useAppDispatch();
  const isLarge = variant === 'lg';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: ICartItem
  ) => {
    const { value: inputValue } = e.target;
    const numericValue = Math.max(0, Number(inputValue.replace(/\D/g, '')));
    dispatch(
      inputToCart({
        product: item.product,
        size: item.size,
        color: item.color,
        quantity: numericValue,
      })
    );
  };
  return (
    <div
      className={cn(
        'sm:flex sm:flex-row bg-white mb-3',
        isLarge && 'mb-5 min-[500px]:flex min-[500px]:flex-row'
      )}
    >
      <div
        className={cn(
          'bg-product-bg h-full min-h-[150px] min-w-[150px] relative shrink-0',
          isLarge && 'w-[204px] h-[250px]'
        )}
      >
        {item.product.imagesUrl[0] && (
          <Image
            src={item.product.imagesUrl[0]}
            alt={item.product.name}
            className='object-cover'
            fill
            sizes='(max-width: 400px) 100vw, (max-width: 640px) 50vw, 33vw'
          />
        )}
      </div>
      <div className={cn('p-2 overflow-auto grow', isLarge && 'p-4')}>
        <Link href={`/product/${item.product._id}`}>
          <h2 className='text-lg uppercase mb-1'>{item.product.name}</h2>
        </Link>
        <div>
          {isLarge && (
            <p className='text-sm leading-5 text-neutral-555 mb-2'>
              {item.product.description}
            </p>
          )}
          <div className='me-2 inline-flex items-center gap-2'>
            <span>цвет {item.color.name}</span>
            <div
              className='h-4 w-4 inline-block outline-2'
              style={{ backgroundColor: item.color.hex }}
            />
          </div>
          , размер {item.size.value}
          {isLarge && (
            <p className='text-copper text-base mt-1 lg:text-xl'>
              ${item.product.price - (item.product.discount ?? 0)}
              {item.product.discount && (
                <span className='text-neutral-400 ms-2 line-through decoration-1'>
                  ${item.product.price}
                </span>
              )}
            </p>
          )}
          <div className='flex items-center justify-between mt-3 flex-wrap gap-4'>
            <div className='flex'>
              <button
                className='cursor-pointer px-1 border hover:bg-neutral-300 active:bg-neutral-300'
                onClick={() =>
                  dispatch(
                    minusOneFromCart({
                      product: item.product,
                      size: item.size,
                      color: item.color,
                    })
                  )
                }
              >
                <Minus size={16} />
              </button>
              <input
                type='text'
                value={item.quantity}
                className='max-w-[40px] text-center border'
                onChange={(e) => handleChange(e, item)}
              />
              <button
                className='cursor-pointer px-1 border hover:bg-neutral-300 active:bg-neutral-300'
                onClick={() =>
                  dispatch(
                    plusOneToCart({
                      product: item.product,
                      size: item.size,
                      color: item.color,
                    })
                  )
                }
              >
                <Plus size={16} />
              </button>
            </div>
            <Button
              size='sm'
              onClick={() =>
                dispatch(
                  deleteFromCart({
                    product: item.product,
                    size: item.size,
                    color: item.color,
                  })
                )
              }
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
