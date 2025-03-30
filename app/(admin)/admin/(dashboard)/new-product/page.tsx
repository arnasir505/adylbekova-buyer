'use client';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
  ACCEPTED_IMAGE_MIME_TYPES,
  LIMIT,
  MAX_FILE_SIZE,
} from '@/lib/constants';
import {
  useCreateProductMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetColorsQuery,
  useGetSizesQuery,
} from '@/store/api';
import { GlobalError } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const NewProduct = () => {
  const formSchema = z.object({
    images: z
      .instanceof(FileList)
      .optional()
      .or(z.literal(null))
      .refine((files) => !files || files.length < LIMIT, {
        message: `Нельзя прикрепить больше ${LIMIT} изображений`,
      })
      .refine(
        (files) =>
          !files ||
          Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
        {
          message: 'Максимальный размер изображения - 5MB',
        }
      )
      .refine(
        (files) =>
          !files ||
          Array.from(files).every((file) =>
            ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)
          ),
        {
          message: 'Допустимые форматы: .jpg, .jpeg, .png, .webp',
        }
      ),
    name: z.string().min(1, { message: 'Введите название' }),
    description: z.string().optional(),
    price: z.string().min(1, { message: 'Цена должна быть выше нуля' }),
    discount: z.string().optional(),
    material: z.string().optional(),
    brand: z.string().min(1, { message: 'Выберите бренд' }),
    category: z.string().min(1, { message: 'Выберите категорию' }),
    colors: z
      .string()
      .array()
      .min(1, { message: 'Выберите хотя бы один цвет' }),
    sizes: z
      .string()
      .array()
      .min(1, { message: 'Выберите хотя бы один размер' }),
  });
  const { data: colorsData } = useGetColorsQuery({});
  const { data: sizesData } = useGetSizesQuery({});
  const { data: brandsData } = useGetBrandsQuery({});
  const { data: categoriesData } = useGetCategoriesQuery({});
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: null,
      name: '',
      description: '',
      price: '',
      discount: '',
      material: '',
      brand: '',
      category: '',
      colors: [],
      sizes: [],
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
      await createProduct(values).unwrap();
      toast.success('Товар создан');
      form.reset();
    } catch (e) {
      const error = e as GlobalError;
      form.setError('discount', { message: error.data.error });
    }
  };

  return (
    <>
      <SiteHeader title='Новый товар' />
      <div className='w-full p-4'>
        <div className='flex flex-col max-w-md gap-4 overflow-y-auto p-4'>
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
              <Button type='submit' disabled={isLoading} className='rounded-lg'>
                {isLoading ? <Loader2 className='animate-spin' /> : 'Создать'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
