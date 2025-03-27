'use client';

import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/ui/cartItem';
import { useAppSelector } from '@/store';
import {
  selectCartItems,
  selectCartItemsTotal,
  selectCartItemsTotalDiscount,
  selectCartItemsTotalOriginalPrice,
  selectCartItemsTotalPrice,
} from '@/store/cart/cartSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Cart = () => {
  const cart = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartItemsTotal);
  const totalPrice = useAppSelector(selectCartItemsTotalPrice);
  const totalOriginalPrice = useAppSelector(selectCartItemsTotalOriginalPrice);
  const totalDiscount = useAppSelector(selectCartItemsTotalDiscount);

  const [cartHasItems, setCartHasItems] = useState(false);

  useEffect(() => {
    setCartHasItems(cart.length > 0);
  }, [cart.length]);

  return (
    <>
      <h1 className='text-2xl md:text-4xl mt-2'>Корзина</h1>
      <div className='flex flex-wrap lg:flex-nowrap gap-5 mt-5 md:flex-row'>
        <div className='w-full'>
          {cartHasItems &&
            cart.map((item) => (
              <CartItem
                variant='lg'
                item={item}
                key={`${item.product._id}-${item.color._id}-${item.size._id}`}
              />
            ))}
        </div>
        {cartHasItems && (
          <div className='w-full max-w-[320px] shrink-0 mx-auto'>
            <div className='p-5 sticky top-20 bg-white'>
              <h2 className='text-2xl mb-4'>Итого</h2>
              <div className='pb-5 border-b border-neutral-400 mb-5'>
                <div className='flex justify-between mb-2 flex-wrap'>
                  <span className='text-neutral-500'>Товаров в корзине:</span>
                  <span>{totalItems} шт.</span>
                </div>
                <div className='flex justify-between mb-2 flex-wrap'>
                  <span className='text-neutral-500'>Стоимость:</span>
                  <span>{totalOriginalPrice} USD</span>
                </div>
                <div className='flex justify-between mb-2 flex-wrap'>
                  <span className='text-neutral-500'>Cкидка:</span>
                  <span>-{totalDiscount} USD</span>
                </div>
              </div>
              <div className='flex justify-between items-center mb-5 flex-wrap'>
                <span className='font-semibold'>К оплате:</span>
                <span className='text-2xl font-semibold'>{totalPrice} USD</span>
              </div>
              <Button className='w-full' size='lg' asChild>
                <Link href='/checkout'>Оформить заказ</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
