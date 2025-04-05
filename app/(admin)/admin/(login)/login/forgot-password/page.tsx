'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForgotPasswordMutation } from '@/store/api';
import { GlobalError } from '@/types/errors';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email }).unwrap();
      setSent(true);
      toast.success(response.message);
    } catch (e) {
      const error = e as GlobalError;
      toast.error(error.data.error);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-start md:items-center p-8 bg-muted'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Восстановление пароля</CardTitle>
          <CardDescription>
            Введите email на который придет письмо
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col sm:flex-row gap-2 justify-between sm:items-center'
          >
            <Input
              placeholder='Email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type='submit' className='rounded-lg' disabled={isLoading}>
              {isLoading ? <Loader2 className='animate-spin' /> : 'Отправить'}
            </Button>
          </form>
          {sent && (
            <p className='text-sm text-green-700 mt-2'>
              Проверьте почту для восстановления
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
