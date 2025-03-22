import { FC } from 'react';
import Image from 'next/image';
import { Icon } from '@/iconpack';
import Link from 'next/link';
import { useAppDispatch } from '@/store';
import { addToCart } from '@/store/cart/cartSlice';
import { Product } from '@/types/products';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  return (
    <div className='min-w-[171px]'>
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
        <p className='text-copper text-base leading-7'>${product.price}</p>
        <h2 className='uppercase truncate'>{product.name}</h2>
        <p className='text-sm leading-5 truncate text-neutral-555 mb-2'>
          {product.description}
        </p>
      </Link>
      <button className='btn-base' onClick={() => dispatch(addToCart(product))}>
        В корзину <Icon name='cart' size='md' color='white' />
      </button>
    </div>
  );
};

export { ProductCard };
