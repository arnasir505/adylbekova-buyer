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
import { useUpdateCategoryMutation } from '@/store/api';
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
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { categoryFormSchema as formSchema } from '@/lib/zod-schemas';
import { Category } from '@/types/categories';

export function CategoryTableCellViewer({ item }: { item: Category }) {
  const isMobile = useIsMobile();

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      label: item.label,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCategory({ ...values, id: item._id }).unwrap();
      toast.success('Категория успешно отредактирована');
    } catch (e) {
      const error = e as GlobalError;
      form.setError('name', { message: error.data.error });
    }
  };

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant='link' className='text-foreground w-fit px-0 text-left'>
          {item.label}
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Редактирование категории</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <Form {...form}>
            <form
              className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='label'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input placeholder='платья вечерние' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название на английском</FormLabel>
                    <FormControl>
                      <Input placeholder='dresses-evening' {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Это перевод названия категории, для мужских категорий
                      используйте букву m в начале, вместо пробелов используйте
                      дефис -
                      <br />
                      рубашки мужские = mshirts
                      <br />
                      платья вечерние = dresses-evening
                    </FormDescription>
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
            <Button variant='outline'>Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
