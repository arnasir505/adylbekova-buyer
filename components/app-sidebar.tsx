'use client';

import { ComponentProps } from 'react';
import {
  IconCirclePlus,
  IconDashboard,
  IconTruckDelivery,
  IconUsers,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/user/userSlice';

const adminNav = [
  {
    title: 'Таблицы',
    url: '/admin',
    icon: IconDashboard,
  },
  {
    title: 'Команда',
    url: '/admin/users',
    icon: IconUsers,
  },
  {
    title: 'Заказы',
    url: '/admin/orders',
    icon: IconTruckDelivery,
  },
  {
    title: 'Создать бренд',
    url: '/admin/new-brand',
    icon: IconCirclePlus,
  },
  {
    title: 'Создать категорию',
    url: '/admin/new-category',
    icon: IconCirclePlus,
  },
  {
    title: 'Создать размер',
    url: '/admin/new-size',
    icon: IconCirclePlus,
  },
  {
    title: 'Создать цвет',
    url: '/admin/new-color',
    icon: IconCirclePlus,
  },
  {
    title: 'Добавить менеджера',
    url: '/admin/new-user',
    icon: IconCirclePlus,
  },
];

const managerNav = [
  {
    title: 'Таблицы',
    url: '/admin',
    icon: IconDashboard,
  },
  {
    title: 'Команда',
    url: '/admin/users',
    icon: IconUsers,
  },
  {
    title: 'Заказы',
    url: '/admin/orders',
    icon: IconTruckDelivery,
  },
];

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const response = useAppSelector(selectUser);
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <span className='text-base font-semibold'>
                  Adylbekova Buyer
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={response?.user.role === 'admin' ? adminNav : managerNav}
          isAdmin={response?.user.role === 'admin'}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={response?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
