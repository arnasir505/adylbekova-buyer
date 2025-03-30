'use client';

import { ComponentProps } from 'react';
import {
  IconCirclePlus,
  IconDashboard,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
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

const data = {
  navMain: [
    {
      title: 'Панель',
      url: '/admin',
      icon: IconDashboard,
    },
    {
      title: 'Команда',
      url: '#',
      icon: IconUsers,
    },
    {
      title: 'Создать бренд',
      url: '/admin/new-brand',
      icon: IconCirclePlus,
    },
  ],
  navSecondary: [
    {
      title: 'Настройки',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Спросить',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Поиск',
      url: '#',
      icon: IconSearch,
    },
  ],
};

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
                  Abyldekoba Buyer
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={response?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
