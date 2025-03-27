'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import { Icon } from '@/iconpack/Icon';
import { palette } from '@/lib/palette';
import { useAppSelector } from '@/store';
import {
  selectCartItems,
  selectCartItemsTotal,
  selectCartItemsTotalPrice,
} from '@/store/cart/cartSlice';
import { CartItem } from './cartItem';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './button';

export const CartSheet = () => {
  const cart = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartItemsTotal);
  const totalPrice = useAppSelector(selectCartItemsTotalPrice);

  const [cartHasItems, setCartHasItems] = useState(false);

  useEffect(() => {
    setCartHasItems(cart.length > 0);
  }, [cart.length]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={cn('cursor-pointer', cartHasItems && 'cart-has-items')}
          aria-label='cart'
        >
          <Icon
            name='shoppingBag'
            size='md'
            color={palette.dark}
            height={27}
            width={27}
          />
        </button>
      </SheetTrigger>
      <SheetContent className='bg-body overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='text-2xl uppercase font-medium'>
            В корзине
          </SheetTitle>
        </SheetHeader>
        <div className='px-4 pb-4'>
          {cart.map((item) => (
            <CartItem
              item={item}
              key={`${item.product._id}-${item.color._id}-${item.size._id}`}
            />
          ))}
          <p className='uppercase pt-1'>Товаров в корзине: {totalItems}</p>
          <p className='uppercase pt-1'>Общая сумма: ${totalPrice}</p>
          {cartHasItems && (
            <Button className='w-full mt-4' size='xl' asChild>
              <Link href='/cart'>Перейти в корзину</Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
