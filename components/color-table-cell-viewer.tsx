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
import { useUpdateColorMutation } from '@/store/api';
import { GlobalError } from '@/types/errors';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { colorFormSchema as formSchema } from '@/lib/zod-schemas';
import { Color } from '@/types/colors';

export function ColorTableCellViewer({ item }: { item: Color }) {
  const isMobile = useIsMobile();

  const [updateColor, { isLoading }] = useUpdateColorMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      hex: item.hex,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateColor({ ...values, id: item._id }).unwrap();
      toast.success('Цвет успешно отредактирован');
    } catch (e) {
      const error = e as GlobalError;
      form.setError('name', { message: error.data.error });
    }
  };

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant='link' className='text-foreground w-fit px-0 text-left'>
          <div className='me-2 inline-flex items-center gap-2'>
            <span>{item.name}</span>
            <div
              className='h-4 w-4 inline-block outline-2'
              style={{ backgroundColor: item.hex }}
            />
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Редактирование цвет</DrawerTitle>
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
                    <FormLabel>Название цвета</FormLabel>
                    <FormControl>
                      <Input placeholder='черный' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='hex'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цвет</FormLabel>
                    <FormControl>
                      <Input type='color' {...field} />
                    </FormControl>
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
