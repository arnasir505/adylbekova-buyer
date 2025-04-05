'use client';
import { useSearchParams } from 'next/navigation';
import { useResetPasswordMutation } from '@/store/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { GlobalError } from '@/types/errors';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const params = useSearchParams();
  const token = params.get('token')!;
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    try {
      const response = await resetPassword({ token, newPassword }).unwrap();
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
          <CardTitle className='text-2xl'>Сброс пароля</CardTitle>
          <CardDescription>Введите новый пароль</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 justify-between'
          >
            <Label htmlFor='password'>Новый пароль</Label>
            <Input
              id='password'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Label htmlFor='confirm'>Повторите пароль</Label>
            <Input
              id='confirm'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type='submit' className='rounded-lg' disabled={isLoading}>
              {isLoading ? (
                <Loader2 className='animate-spin' />
              ) : (
                'Сбросить пароль'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
