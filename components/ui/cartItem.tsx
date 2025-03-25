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

interface Props {
  item: ICartItem;
}

export const CartItem: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

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
    <div className='sm:flex sm:flex-row bg-white mb-3'>
      <div className='bg-product-bg h-full min-h-[150px] min-w-[150px] relative shrink-0'>
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
      <div className='p-2 overflow-auto grow'>
        <Link href={`/product/${item.product._id}`}>
          <h2 className='text-lg uppercase mb-1 truncate'>
            {item.product.name}
          </h2>
        </Link>
        <div>
          <div className='me-2 inline-flex items-center gap-2'>
            <span>цвет {item.color.name}</span>
            <div
              className='h-4 w-4 inline-block outline-2'
              style={{ backgroundColor: item.color.hex }}
            />
          </div>
          , размер {item.size.value}
          <div className='flex items-center justify-between mt-3'>
            <div className='flex'>
              <button
                className='cursor-pointer px-1 border hover:bg-neutral-300 transition-all'
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
                className='cursor-pointer px-1 border hover:bg-neutral-300 transition-all'
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
            <button
              className='btn-base !w-auto px-3'
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
