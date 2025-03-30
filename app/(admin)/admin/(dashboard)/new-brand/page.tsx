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
import { Textarea } from '@/components/ui/textarea';
import { useCreateBrandMutation } from '@/store/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  image: z.instanceof(File).optional().or(z.literal(null)),
  name: z.string().min(1, { message: 'Введите название' }),
  description: z.string().optional(),
});

const NewBrand = () => {
  const [createBrand, { isLoading }] = useCreateBrandMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createBrand(values).unwrap();
      toast.success('Бренд создан');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <SiteHeader title='Новый бренд' />
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

export default NewBrand;
