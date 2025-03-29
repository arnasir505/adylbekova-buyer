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
  useCreateProductMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetColorsQuery,
  useGetSizesQuery,
} from '@/store/api';
import { ProductFields } from '@/types/products';
import { FormEvent, useState } from 'react';

const NewProduct = () => {
  const { data: colorsData } = useGetColorsQuery({});
  const { data: sizesData } = useGetSizesQuery({});
  const { data: brandsData } = useGetBrandsQuery({});
  const { data: categoriesData } = useGetCategoriesQuery({});
  const [images, setImages] = useState<FileList | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [material, setMaterial] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleCreateProduct = async (values: ProductFields) => {
    try {
      const response = await createProduct(values).unwrap();
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

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
    const product: ProductFields = {
      images,
      name,
      description,
      price,
      discount,
      material,
      brand,
      category,
      colors: selectedColors,
      sizes: selectedSizes,
    };
    void handleCreateProduct(product);
  };
  return (
    <>
      <SiteHeader title='Новый товар' />
      <div className='w-full p-4'>
        <div className='flex flex-col max-w-md gap-4 overflow-y-auto p-4'>
          <form className='flex flex-col gap-4' onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='images'>Изображения</Label>
              <Input
                id='images'
                type='file'
                multiple
                accept='image/*'
                onChange={(e) => setImages(e.target.files)}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='name'>Название</Label>
              <Input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='description'>Описание</Label>
              <Textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='price'>Цена (в долларах)</Label>
                <Input
                  id='price'
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='discount'>Скидка (необязательно)</Label>
                <Input
                  id='discount'
                  type='number'
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='material'>Материал</Label>
              <Textarea
                id='material'
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
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
                <Select value={brand} onValueChange={setBrand}>
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
                <Select value={category} onValueChange={setCategory}>
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
            <Button type='submit' disabled={isLoading}>
              Создать
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
