import { Icon } from '@/iconpack/Icon';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import { palette } from '@/lib/palette';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import { ChevronRight } from 'lucide-react';
import { useMenuItems } from '@/hooks/use-menu-items';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const FILTER_KEYS = ['brand', 'category', 'q', 'sort'];

export const Menu = () => {
  const menuItems = useMenuItems();
  const searchParams = useSearchParams();

  // Keep the other active filters and toggle this one; reset pagination.
  const buildHref = (key: string, value: string) => {
    const params = new URLSearchParams();
    FILTER_KEYS.forEach((k) => {
      const v = searchParams.get(k);
      if (v) params.set(k, v);
    });

    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    return query ? `/products?${query}` : '/products';
  };

  return (
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
      <SheetContent side='left' className='bg-body overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='text-2xl uppercase font-medium'>
            Меню
          </SheetTitle>
          <Accordion type='single' collapsible className='w-full'>
            {menuItems.map((menuItem) => (
              <AccordionItem value={menuItem.value} key={menuItem.value}>
                <AccordionTrigger className='AccordionTrigger uppercase text-lg mt-4 flex items-center gap-2 cursor-pointer'>
                  <p>{menuItem.label}</p>{' '}
                  <ChevronRight
                    className='AccordionChevron pointer-events-none shrink-0 transition-transform duration-200'
                    strokeWidth={1}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  {/* Long lists scroll inside their own section so the other
                      section headers stay visible. */}
                  <div className='max-h-[60dvh] overflow-y-auto overscroll-contain pe-2'>
                    {menuItem.children.map((item) => (
                      <SheetClose asChild key={item.value}>
                        <Link
                          href={buildHref(menuItem.value, item.value)}
                          className={cn(
                            'block my-1.5 ps-2 cursor-pointer capitalize',
                            searchParams.get(menuItem.value) === item.value &&
                              'font-semibold underline'
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
