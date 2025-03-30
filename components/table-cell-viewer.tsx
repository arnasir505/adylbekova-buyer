'use client';

import { useState } from 'react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { MultiSelect } from './ui/multiSelect';
import { Product } from '@/types/products';

export function ProductTableCellViewer({ item }: { item: Product }) {
  const isMobile = useIsMobile();

  const colorsList = [
    { value: 'черный', label: 'черный' },
    { value: 'белый', label: 'белый' },
    { value: 'серый', label: 'серый' },
  ];

  const sizesList = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant='link'
          className='text-foreground w-fit px-0 text-left capitalize'
        >
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>{item.name}</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='header'>Название</Label>
              <Input id='header' defaultValue={item.name} />
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='size'>Размер</Label>
                <MultiSelect
                  id='size'
                  options={sizesList}
                  onValueChange={setSelectedSizes}
                  placeholder='Выберите размеры'
                />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='color'>Цвет</Label>
                <MultiSelect
                  id='color'
                  options={colorsList}
                  onValueChange={setSelectedColors}
                  placeholder='Выберите цвета'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='brand'>Бренд</Label>
                <Select defaultValue={item.brand._id}>
                  <SelectTrigger id='brand' className='w-full'>
                    <SelectValue placeholder='Выберите бренд' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Zara'>Zara</SelectItem>
                    <SelectItem value='Dior'>Dior</SelectItem>
                    <SelectItem value='Gucci'>Gucci</SelectItem>
                    <SelectItem value='Armani'>Armani</SelectItem>
                    <SelectItem value='Chanel'>Chanel</SelectItem>
                    <SelectItem value='Louis'>Louis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='category'>Категория</Label>
                <Select defaultValue={item.category._id}>
                  <SelectTrigger id='size' className='w-full'>
                    <SelectValue placeholder='Выберите категорию' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='юбки'>юбки</SelectItem>
                    <SelectItem value='плащи'>плащи</SelectItem>
                    <SelectItem value='пуховики'>пуховики</SelectItem>
                    <SelectItem value='платья'>платья офисные</SelectItem>
                    <SelectItem value='платья 1'>платья вечерние</SelectItem>
                    <SelectItem value='пальто'>пальто</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>В разработке</Button>
          <DrawerClose asChild>
            <Button variant='outline'>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
