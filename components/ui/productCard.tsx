import { FC } from 'react';
import Image from 'next/image';
import { Icon } from '@/iconpack';
import Link from 'next/link';

interface Props {
  _id: string;
  imagesUrl: string[];
  name: string;
  description: string;
  price: number;
}

const ProductCard: FC<Props> = ({
  _id,
  imagesUrl,
  name,
  description,
  price,
}) => {
  return (
    <div className='min-w-[171px]'>
      <Link href={`/product/${_id}`}>
        <div className='bg-product-bg h-[228px] relative'>
          {imagesUrl[0] && (
            <Image
              src={imagesUrl[0]}
              alt={name}
              className='object-cover'
              fill
              sizes='(max-width: 400px) 100vw, (max-width: 640px) 50vw, 33vw'
            />
          )}
        </div>
        <p className='text-copper text-base leading-7'>${price}</p>
        <h2 className='uppercase truncate'>{name}</h2>
        <p className='text-sm leading-5 truncate text-neutral-555 mb-2'>
          {description}
        </p>
      </Link>
      <button className='btn-base'>
        В корзину <Icon name='cart' size='md' color='white' />
      </button>
    </div>
  );
};

export { ProductCard };
