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

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateBrandMutation } from '@/store/api';
import { GlobalError } from '@/types/errors';
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
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Brand } from '@/types/brands';
import { brandFormSchema as formSchema } from '@/lib/zod-schemas';
import Image from 'next/image';

export function BrandTableCellViewer({ item }: { item: Brand }) {
  const isMobile = useIsMobile();

  const [updateBrand, { isLoading }] = useUpdateBrandMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      description: item.description,
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateBrand({ ...values, id: item._id }).unwrap();
      toast.success('Бренд успешно отредактирован');
    } catch (e) {
      const error = e as GlobalError;
      form.setError('name', { message: error.data.error });
    }
  };

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant='link' className='text-foreground w-fit px-0 text-left'>
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Редактирование бренда</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <Form {...form}>
            <form
              className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input placeholder='Zara' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name='image'
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Изображение</FormLabel>
                    {item.imageUrl && (
                      <div>
                        <Image
                          src={item.imageUrl}
                          height={100}
                          width={100}
                          alt={item.name}
                        />
                      </div>
                    )}
                    <FormControl>
                      <Input
                        type='file'
                        accept='image/*'
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormDescription className='text-red-600'>
                      ВНИМАНИЕ! При изменении изображения бренда, прошлое
                      изображение исчезнет
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='rounded-lg' disabled={isLoading}>
                {isLoading ? <Loader2 className='animate-spin' /> : 'Сохранить'}
              </Button>
            </form>
          </Form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline' className='rounded-lg'>
              Закрыть
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
