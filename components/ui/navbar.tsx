import { Icon } from '@/iconpack';
import { palette } from '@/lib/palette';
import Link from 'next/link';
import { CartSheet } from './cartSheet';
import { Menu } from './menu';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-2 mt-3'>
      <Menu />
      <Link
        href='/products'
        className='font-cormorant text-center text-xl min-[320px]:text-2xl uppercase leading-5'
      >
        Adylbekova <br /> Buyer
      </Link>
      <div className='space-x-4 md:space-x-6'>
        <button className='cursor-pointer' aria-label='search'>
          <Icon
            name='search'
            size='md'
            color={palette.dark}
            height={27}
            width={27}
          />
        </button>
        <CartSheet />
      </div>
    </nav>
  );
};

export { Navbar };
