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
import { useUpdateSizeMutation } from '@/store/api';
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
import { sizeFormSchema as formSchema } from '@/lib/zod-schemas';
import { Size } from '@/types/sizes';

export function SizeTableCellViewer({ item }: { item: Size }) {
  const isMobile = useIsMobile();

  const [updateSize, { isLoading }] = useUpdateSizeMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: item.value,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateSize({ ...values, id: item._id }).unwrap();
      toast.success('Размер успешно отредактирован');
    } catch (e) {
      const error = e as GlobalError;
      form.setError('value', { message: error.data.error });
    }
  };

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant='link' className='text-foreground w-fit px-0 text-left'>
          {item.value}
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Редактирование размера</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <Form {...form}>
            <form
              className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='value'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Размер</FormLabel>
                    <FormControl>
                      <Input placeholder='XL' {...field} />
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
            <Button variant='outline'>Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
