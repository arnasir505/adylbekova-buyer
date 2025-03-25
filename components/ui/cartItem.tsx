import { CartItem as ICartItem } from '@/types/cart';
import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/store';
import { deleteFromCart } from '@/store/cart/cartSlice';

interface Props {
  item: ICartItem;
}

export const CartItem: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
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
      <div className='p-2 overflow-auto'>
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
          , размер {item.size.value}, кол-во {item.quantity}
          <div className='flex justify-end w-full'>
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
