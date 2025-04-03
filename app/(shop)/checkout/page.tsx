'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearCart, selectCartItems } from '@/store/cart/cartSlice';
import { OrderFields } from '@/types/order';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { orderFormSchema as formSchema } from '@/lib/zod-schemas';
import { useCreateOrderMutation } from '@/store/api';
import { GlobalError } from '@/types/errors';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      email: '',
      country: '',
      city: '',
      address: '',
      phone: '',
      orderDetails: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const products = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size._id,
        color: item.color._id,
      }));
      const orderFields: OrderFields = {
        ...values,
        products,
      };
      const response = await createOrder(orderFields).unwrap();
      dispatch(clearCart());
      router.push(`/checkout/confirmation?orderNumber=${response.orderNumber}`);
    } catch (e) {
      const error = e as GlobalError;
      form.setError('orderDetails', { message: error.data.error });
    }
  };

  return (
    <>
      <h1 className='text-2xl md:text-4xl mt-2'>Оформление заказа</h1>
      <div className='flex flex-wrap md:flex-nowrap gap-4 mt-5 md:flex-row'>
        <div className='w-full max-w-sm shrink-0 bg-white p-5 rounded'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваше Имя</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type='email' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Страна</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Город / Село</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер телефона</FormLabel>
                    <FormControl>
                      <Input {...field} type='tel' />
                    </FormControl>
                    <FormDescription>
                      Введите номер в международном формате
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='orderDetails'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Примечания к заказу</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                size='lg'
                className='w-full rounded-md'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  'Подтвердить заказ'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
