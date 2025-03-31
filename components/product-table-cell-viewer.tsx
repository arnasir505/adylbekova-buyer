'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { MultiSelect } from './ui/multiSelect';
import { Product } from '@/types/products';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema as formSchema } from '@/lib/zod-schemas';
import { z } from 'zod';
import {
  useGetColorsQuery,
  useGetSizesQuery,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} from '@/store/api';
import { GlobalError, ValidationError } from '@/types/errors';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Textarea } from './ui/textarea';
import Image from 'next/image';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function ProductTableCellViewer({ item }: { item: Product }) {
  const isMobile = useIsMobile();
  const { data: colorsData } = useGetColorsQuery({});
  const { data: sizesData } = useGetSizesQuery({});
  const { data: brandsData } = useGetBrandsQuery({});
  const { data: categoriesData } = useGetCategoriesQuery({});
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: null,
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      discount: item.discount?.toString(),
      material: item.material,
      brand: item.brand._id,
      category: item.category._id,
      colors: item.colors.map((color) => color._id),
      sizes: item.sizes.map((size) => size._id),
    },
  });

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateProduct({ ...values, id: item._id }).unwrap();
      toast.success('Товар успешно отредактирован');
    } catch (e) {
      const error = e as GlobalError | ValidationError;
      if (typeof error.data.error === 'string') {
        form.setError('discount', { message: error.data.error });
      } else {
        for (const key in error.data.error.errors) {
          // @ts-expect-error: key is valid when server sends valid key
          form.setError(key, {
            message: error.data.error.errors[key].message,
          });
        }
      }
    }
  };

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant='link'
          className='text-foreground w-fit px-0 text-left'
        >
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Редактирование товара</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <Form {...form}>
            <form
              className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='flex flex-col gap-3'>
                <FormField
                  control={form.control}
                  name='images'
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                      <FormLabel>Изображения</FormLabel>
                      <div className='flex flex-wrap gap-2'>
                        {item.imagesUrl.map((url) => (
                          <Image
                            key={url}
                            src={url}
                            width={150}
                            height={200}
                            alt={item.name}
                          />
                        ))}
                      </div>
                      <FormControl>
                        <Input
                          type='file'
                          accept='image/*'
                          multiple
                          onBlur={onBlur}
                          name={name}
                          ref={ref}
                          onChange={(e) => onChange(e.target.files || null)}
                        />
                      </FormControl>
                      <FormDescription className='text-red-600'>
                        ВНИМАНИЕ! При изменении фотографий товара, прошлые
                        фотографии исчезнут
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-3'>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Цена в долларах</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  <FormField
                    control={form.control}
                    name='discount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Скидка (необязательно)</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <FormField
                  control={form.control}
                  name='material'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Материал</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormField
                  control={form.control}
                  name='sizes'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Размер</FormLabel>
                      <MultiSelect
                        defaultValue={field.value}
                        options={sizesList}
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        placeholder='Выберите размеры'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <FormField
                  control={form.control}
                  name='colors'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цвет</FormLabel>
                      <MultiSelect
                        defaultValue={field.value}
                        options={colorsList}
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        placeholder='Выберите цвета'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-3'>
                  <FormField
                    control={form.control}
                    name='brand'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Бренд</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='w-full'>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Категория</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Выберите категорию' />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriesData?.categories.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? <Loader2 className='animate-spin' /> : 'Сохранить'}
              </Button>
            </form>
          </Form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
