export const API_URL = process.env['NEXT_PUBLIC_API_URL'];
export const LIMIT = 10;
// Welcome-screen flag: localStorage key and cookie name (read by middleware.ts).
export const VISITED_KEY = 'hasVisited';

// Product list sorting. Values must match PRODUCT_SORTS in the backend
// products controller.
export const SORT_OPTIONS = [
  { value: 'new', label: 'Сначала новые' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
] as const;
export const DEFAULT_SORT = 'new';
export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
export const ORDER_STATUS = ['pending', 'processing', 'completed', 'canceled'];
