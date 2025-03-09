import { Icon } from '@/app/iconpack';
import { palette } from '@/app/shared/palette';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-2 mt-3'>
      <button className='cursor-pointer'>
        <Icon
          name='menu'
          size='md'
          color={palette.dark}
          height={27}
          width={27}
        />
      </button>
      <Link
        href='/'
        className='font-cormorant text-center text-xl min-[320px]:text-2xl uppercase leading-5'
      >
        Adylbekova <br /> Buyer
      </Link>
      <div className='space-x-4 md:space-x-6'>
        <button className='cursor-pointer'>
          <Icon
            name='search'
            size='md'
            color={palette.dark}
            height={27}
            width={27}
          />
        </button>
        <button className='cursor-pointer'>
          <Icon
            name='shoppingBag'
            size='md'
            color={palette.dark}
            height={27}
            width={27}
          />
        </button>
      </div>
    </nav>
  );
};
