'use client';

import { Icon } from '@/iconpack';
import { palette } from '@/lib/palette';
import Link from 'next/link';
import { CartSheet } from './cartSheet';
import { Menu } from './menu';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(search);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!inputValue.trim() && !buttonRef.current?.contains(e.relatedTarget)) {
      setIsSearchOpen(false);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/products?q=${encodeURIComponent(inputValue.trim())}`);
    }
    setIsSearchOpen(false);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSearchOpen) {
      onSubmit(e as unknown as FormEvent<HTMLFormElement>);
    } else {
      handleSearchToggle();
    }
  };

  return (
    <nav className='flex items-center justify-between py-4 sticky top-0 z-50 bg-body'>
      <Menu />

      <Link
        href='/products'
        className={cn(
          'font-cormorant text-center text-xl min-[320px]:text-2xl uppercase leading-5',
          isSearchOpen ? 'hidden' : 'block'
        )}
      >
        Adylbekova <br /> Buyer
      </Link>

      <div className='flex space-x-4 md:space-x-6'>
        <form onSubmit={onSubmit} className='flex items-center gap-2'>
          <input
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='Поиск товаров'
            className={`px-2 py-1 ms-2 rounded-lg bg-white transition-all duration-300 w-full sm:w-[250px] 
            ${isSearchOpen ? 'block' : 'hidden'}`}
          />

          <button
            ref={buttonRef}
            className='cursor-pointer'
            type='button'
            aria-label='search'
            onClick={handleButtonClick}
          >
            <Icon
              name='search'
              size='md'
              color={palette.dark}
              height={27}
              width={27}
            />
          </button>
        </form>

        <CartSheet />
      </div>
    </nav>
  );
};

export { Navbar };
