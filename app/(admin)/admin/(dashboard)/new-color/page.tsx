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
import { useCreateColorMutation } from '@/store/api';
import { GlobalError } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Введите название цвета' }),
  hex: z.string().min(1, { message: 'Выберите цвет' }),
});

const NewColor = () => {
  const [createColor, { isLoading }] = useCreateColorMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      hex: '#000000',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createColor(values).unwrap();
      toast.success('Цвет создан');
      form.reset();
    } catch (e) {
      const error = e as GlobalError;
      form.setError('name', { message: error.data.message });
    }
  };

  return (
    <>
      <SiteHeader title='Новый цвет' />
      <div className='w-full p-4'>
        <div className='flex flex-col max-w-md gap-4 overflow-y-auto p-4'>
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
                Создать
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NewColor;
