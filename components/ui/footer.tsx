import { Icon } from '@/iconpack';
import { palette } from '@/lib/palette';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className='w-full mt-10 mb-4 py-[25px] bg-white'>
        <div className='max-w-[270px] mx-auto flex flex-col items-center'>
          <div className='flex justify-center gap-12'>
            <Link href='/products'>
              <Icon name='tiktok' size='lg' color={palette.neutral_333} />
            </Link>
            <Link href='/products'>
              <Icon name='instagram' size='lg' color={palette.neutral_333} />
            </Link>
            <Link href='/products'>
              <Icon name='facebook' size='lg' color={palette.neutral_333} />
            </Link>
          </div>
          <Icon
            name='separator'
            color={palette.neutral_555}
            width={134}
            height={11}
            className='my-6'
          />
          <div className='text-center flex flex-col gap-2 text-neutral-333'>
            <Link href='mailto:adylbekovabuyer@gmail.com'>
              adylbekovabuyer@gmail.com
            </Link>
            <Link href='tel:+996779510201'>+996 774 550 202</Link>
            <p>08:00 - 22:00 - Каждый день</p>
          </div>
          <Icon
            name='separator'
            color={palette.neutral_555}
            width={134}
            height={11}
            className='my-6'
          />
          <Link href='/how-to-order'>Как оформить заказ</Link>
          <div className='flex justify-center gap-12 mt-5'>
            <Link href='/products'>О нас</Link>
            <Link href='/products'>Контакты</Link>
            <Link href='/products'>Блог</Link>
          </div>
        </div>
      </div>
      <p className='text-neutral-555 text-sm text-center'>
        Copyright© Adylbekova Buyer All Rights Reserved.
      </p>
    </footer>
  );
};

export { Footer };
