import { Icon } from '@/iconpack';
import { palette } from '@/lib/palette';
import Link from 'next/link';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from './sheet';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { MENU_ITEMS } from '@/lib/constants';
import { ChevronRight } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-2 mt-3'>
      <Sheet>
        <SheetTrigger asChild>
          <button className='cursor-pointer' aria-label='menu'>
            <Icon
              name='menu'
              size='md'
              color={palette.dark}
              height={27}
              width={27}
            />
          </button>
        </SheetTrigger>
        <SheetContent side='left' className='bg-body'>
          <SheetHeader>
            <SheetTitle className='text-2xl uppercase font-medium'>
              Меню
            </SheetTitle>
            <Accordion type='single' collapsible className='w-full'>
              {MENU_ITEMS.map((item) => (
                <AccordionItem value={item.value} key={item.value}>
                  <AccordionTrigger className='AccordionTrigger uppercase text-lg mt-4 flex items-center gap-2 cursor-pointer'>
                    <p>{item.label}</p>{' '}
                    <ChevronRight
                      className='AccordionChevron pointer-events-none shrink-0 transition-transform duration-200'
                      strokeWidth={1}
                    />
                  </AccordionTrigger>
                  <AccordionContent className='AccordionContent'>
                    <Accordion type='single' collapsible>
                      {item.children.map((item, index) => (
                        <AccordionItem
                          value={`${item.value}-${index}`}
                          key={`${item.value}-${index}`}
                          className='border-b-1 border-neutral-400 data-[state="open"]:bg-white'
                        >
                          <AccordionTrigger className='py-1.5 ps-2 cursor-pointer'>
                            <p>{item.label}</p>
                          </AccordionTrigger>
                          <AccordionContent
                            className={
                              item.children.length > 0 ? 'AccordionContent' : ''
                            }
                          >
                            {item.children.map((item, index) => (
                              <p
                                key={`${item.value}-${index}`}
                                className='py-1.5 ms-2 ps-2 text-sm cursor-pointer capitalize border-b-1 border-neutral-400 last:border-none'
                              >
                                {item.label}
                              </p>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SheetHeader>
        </SheetContent>
      </Sheet>
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
        <button className='cursor-pointer' aria-label='cart'>
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

export { Navbar };
