'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from '@/iconpack';
import {
  SHOP_WHATSAPP_NUMBER,
  buildWhatsAppUrl,
  loadOrderMessage,
  normalizePhone,
} from '@/lib/whatsapp';

const ConfirmationPage = () => {
  const params = useSearchParams();
  const orderNumber = params.get('orderNumber');
  // Number assigned to this order by the backend, else the shop default.
  const whatsAppNumber = normalizePhone(params.get('wa')) || SHOP_WHATSAPP_NUMBER;
  const [message, setMessage] = useState<string | null>(null);

  // sessionStorage is only available in the browser, so read it after mount.
  useEffect(() => {
    if (!orderNumber) return;
    setMessage(
      loadOrderMessage(orderNumber) ??
        `Здравствуйте! Я оформил(а) заказ №${orderNumber} на сайте.`
    );
  }, [orderNumber]);

  const whatsAppUrl =
    whatsAppNumber && message ? buildWhatsAppUrl(whatsAppNumber, message) : null;

  return (
    <div className='flex flex-col my-20 p-5 w-full max-w-sm mx-auto'>
      <h1 className='text-3xl font-bold'>Спасибо за ваш заказ!</h1>
      <p className='text-lg mt-3'>
        Менеджер свяжется с вами в ближайшее время.
      </p>
      {orderNumber && (
        <p className='mt-2 text-gray-600'>
          Номер заказа: <strong>{orderNumber}</strong>
        </p>
      )}

      {whatsAppUrl && (
        <>
          <p className='mt-6 text-base'>
            Чтобы ускорить обработку, отправьте заказ нам в WhatsApp
          </p>
          <Button className='mt-4 bg-[#25D366] hover:bg-[#1ebe5a]' asChild>
            <a href={whatsAppUrl} target='_blank' rel='noopener noreferrer'>
              <Icon name='whatsapp' size={20} color='white' />
              Отправить заказ в WhatsApp
            </a>
          </Button>
        </>
      )}

      <Button
        className='mt-4'
        variant={whatsAppUrl ? 'outline' : 'default'}
        asChild
      >
        <Link href='/products'>Вернуться на главную</Link>
      </Button>
    </div>
  );
};

export default ConfirmationPage;
