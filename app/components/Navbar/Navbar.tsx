import { Icon } from '@/app/iconpack';
import { palette } from '@/app/shared/palette';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-2 mt-3'>
      <button>
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
        className='font-cormorant text-center text-2xl uppercase leading-5'
      >
        Adylbekova <br /> Buyer
      </Link>
      <div className='space-x-4'>
        <button>
          <Icon
            name='search'
            size='md'
            color={palette.dark}
            height={27}
            width={27}
          />
        </button>
        <button>
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
