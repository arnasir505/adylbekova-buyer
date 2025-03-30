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
import { useCreateSizeMutation } from '@/store/api';
import { GlobalError } from '@/types/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { sizeFormSchema as formSchema } from '@/lib/zod-schemas';

const NewSize = () => {
  const [createSize, { isLoading }] = useCreateSizeMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createSize(values).unwrap();
      toast.success('Размер создан');
      form.reset();
    } catch (e) {
      const error = e as GlobalError;
      form.setError('value', { message: error.data.error });
    }
  };

  return (
    <>
      <SiteHeader title='Новый размер' />
      <div className='w-full p-4'>
        <div className='flex flex-col max-w-md gap-4 overflow-y-auto p-4'>
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
                {isLoading ? <Loader2 className='animate-spin' /> : 'Создать'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NewSize;
