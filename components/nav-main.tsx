'use client';

import { IconCirclePlusFilled, type Icon } from '@tabler/icons-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavMain({
  items,
  isAdmin,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
  isAdmin: boolean;
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        {isAdmin && (
          <SidebarMenu>
            <SidebarMenuItem className='flex items-center gap-2'>
              <SidebarMenuButton
                tooltip='Создать'
                className='bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear'
                asChild
              >
                <Link href='/admin/new-product'>
                  <IconCirclePlusFilled />
                  <span>Создать товар</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link
                  className={pathname === item.url ? 'bg-sidebar-border' : ''}
                  href={item.url}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
