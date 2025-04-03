import { Order } from '@/types/order';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const s3Loader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const translateOrderStatus: (status: Order['status']) => string = (
  status
) => {
  switch (status) {
    case 'pending':
      return 'В ожидании';
    case 'processing':
      return 'В обработке';
    case 'completed':
      return 'Завершен';
    case 'canceled':
      return 'Отменен';
    default:
      return 'Неизвестный статус';
  }
};
