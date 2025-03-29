'use client';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multiSelect';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetColorsQuery,
  useGetSizesQuery,
} from '@/store/api';
import { FormEvent, useState } from 'react';

const NewProduct = () => {
  const { data: colorsData } = useGetColorsQuery({});
  const { data: sizesData } = useGetSizesQuery({});
  const { data: brandsData } = useGetBrandsQuery({});
  const { data: categoriesData } = useGetCategoriesQuery({});

  const colorsList =
    colorsData?.colors.map((color) => ({
      value: color._id,
      label: color.name,
    })) || [];

  const sizesList =
    sizesData?.sizes.map((size) => ({
      value: size._id,
      label: size.value,
    })) || [];

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ colors: selectedColors, sizes: selectedSizes });
  };
  return (
    <>
      <SiteHeader title='Новый товар' />
      <div className='w-full p-4'>
        <div className='flex flex-col max-w-md gap-4 overflow-y-auto p-4'>
          <form className='flex flex-col gap-4' onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='images'>Изображения</Label>
              <Input id='images' type='file' multiple accept='image/*' />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='name'>Название</Label>
              <Input id='name' />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='description'>Описание</Label>
              <Textarea id='description' />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='price'>Цена (в долларах)</Label>
                <Input id='price' type='number' />
              </div>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='discount'>Скидка (необязательно)</Label>
                <Input id='discount' type='number' />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='material'>Материал</Label>
              <Textarea id='material' />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='size'>Размер</Label>
              <MultiSelect
                id='size'
                options={sizesList}
                onValueChange={setSelectedSizes}
                placeholder='Выберите размеры'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='color'>Цвет</Label>
              <MultiSelect
                id='color'
                options={colorsList}
                onValueChange={setSelectedColors}
                placeholder='Выберите цвета'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='brand'>Бренд</Label>
                <Select>
                  <SelectTrigger id='brand' className='w-full'>
                    <SelectValue placeholder='Выберите бренд' />
                  </SelectTrigger>
                  <SelectContent>
                    {brandsData?.brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='category'>Категория</Label>
                <Select>
                  <SelectTrigger id='category' className='w-full'>
                    <SelectValue placeholder='Выберите категорию' />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData?.categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type='submit'>Создать</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
