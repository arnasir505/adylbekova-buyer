'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/store';
import { useLoginMutation } from '@/store/api';
import { updateState } from '@/store/user/userSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await login(values).unwrap();
      dispatch(updateState(response));
      router.push('/admin');
    } catch (err) {
      if (typeof err === 'string') {
        form.setError('password', { message: err });
      }
    }
  };

  const useOnSubmit = (values: z.infer<typeof formSchema>) => {
    void handleLogin(values);
  };

  return (
    <div className='min-h-screen flex justify-center items-start md:items-center p-8'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Вход</CardTitle>
          <CardDescription>
            Введите email чтобы войти в систему
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(useOnSubmit)}>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <FormControl>
                          <Input
                            id='email'
                            type='email'
                            placeholder='m@example.com'
                            autoComplete='username'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center'>
                          <FormLabel htmlFor='password'>Пароль</FormLabel>
                          <a
                            href='#'
                            className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                          >
                            Забыли пароль?
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            id='password'
                            type='password'
                            autoComplete='current-password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? <Loader2 className='animate-spin' /> : 'Войти'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
