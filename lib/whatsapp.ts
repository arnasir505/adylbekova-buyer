import { CartItem } from '@/types/cart';

// Shop number in international format, digits only (e.g. 996555123456).
export const SHOP_WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
).replace(/\D/g, '');

const STORAGE_PREFIX = 'whatsapp-order:';

interface OrderMessageData {
  orderNumber: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  customer: {
    firstName: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    address: string;
    orderDetails?: string;
  };
  siteOrigin: string;
}

export const buildOrderMessage = ({
  orderNumber,
  items,
  totalPrice,
  totalItems,
  customer,
  siteOrigin,
}: OrderMessageData) => {
  const lines = items.map((item, index) => {
    const unitPrice = Math.max(
      item.product.price - (item.product.discount ?? 0),
      0
    );
    return [
      `${index + 1}. ${item.product.brand?.name ?? ''} — ${item.product.name}`.trim(),
      `   Размер: ${item.size.value}, цвет: ${item.color.name}`,
      `   ${item.quantity} × $${unitPrice} = $${unitPrice * item.quantity}`,
      `   ${siteOrigin}/product/${item.product._id}`,
    ].join('\n');
  });

  return [
    `Новый заказ №${orderNumber}`,
    '',
    'Товары:',
    ...lines,
    '',
    `Итого: ${totalItems} шт. на $${totalPrice}`,
    '',
    'Покупатель:',
    `Имя: ${customer.firstName}`,
    `Телефон: ${customer.phone}`,
    `Email: ${customer.email}`,
    `Адрес: ${customer.country}, ${customer.city}, ${customer.address}`,
    customer.orderDetails?.trim()
      ? `Примечание: ${customer.orderDetails.trim()}`
      : '',
  ]
    .filter((line, i, all) => line !== '' || all[i - 1] !== '')
    .join('\n')
    .trim();
};

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// The message is handed from checkout to the confirmation page via
// sessionStorage, which can be unavailable (private mode etc.) — so every
// access is guarded and callers must cope with a missing message.
export const saveOrderMessage = (orderNumber: string, message: string) => {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + orderNumber, message);
  } catch {}
};

export const loadOrderMessage = (orderNumber: string): string | null => {
  try {
    return sessionStorage.getItem(STORAGE_PREFIX + orderNumber);
  } catch {
    return null;
  }
};
