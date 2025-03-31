'use client';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateCategoryMutation } from '@/store/api';
import { GlobalError } from '@/types/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { categoryFormSchema as formSchema } from '@/lib/zod-schemas';

const NewCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      label: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createCategory(values).unwrap();
      toast.success('Категория создана');
      form.reset();
    } catch (e) {
      const error = e as GlobalError;
      form.setError('name', {
        message: error.data.error,
      });
    }
  };

  return (
    <>
      <SiteHeader title='Новая категория' />
      <div className='w-full p-4'>
        <div className='flex flex-col max-w-md gap-4 overflow-y-auto p-4'>
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
                {isLoading ? <Loader2 className='animate-spin' /> : 'Создать'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NewCategory;
