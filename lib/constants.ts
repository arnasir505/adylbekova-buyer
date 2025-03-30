export const API_URL = process.env['NEXT_PUBLIC_API_URL'];
export const LIMIT = 10;
export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
export const MENU_ITEMS = [
  {
    label: 'Бренд',
    value: 'brand',
    children: [
      {
        label: 'Zara',
        value: 'zara',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
      {
        label: 'Dolce & Gabbana',
        value: 'dolce_gabbana',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
      {
        label: 'Dior',
        value: 'dior',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
      {
        label: 'Gucci',
        value: 'gucci',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
      {
        label: 'Armani',
        value: 'armani',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
      {
        label: 'Chanel',
        value: 'chanel',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
      {
        label: 'Louis Vuitton',
        value: 'louis_vuitton',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
    ],
  },
  {
    label: 'Женщинам',
    value: 'women',
    children: [
      {
        label: 'Верхняя одежда',
        value: 'outerwear',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
      {
        label: 'Платья и юбки',
        value: 'dresses_skirts',
        children: [
          { label: 'вечерние', value: 'evening' },
          { label: 'повседневные', value: 'casual' },
          { label: 'офисные', value: 'office' },
          { label: 'юбки', value: 'skirts' },
        ],
      },
      { label: 'Брюки и джинсы', value: 'trousers_jeans', children: [] },
      { label: 'Блузы и рубашки', value: 'blouses_shirts', children: [] },
      {
        label: 'Свитера и кардиганы',
        value: 'sweaters_cardigans',
        children: [],
      },
      { label: 'Обувь', value: 'shoes', children: [] },
      { label: 'Аксессуары', value: 'accessories', children: [] },
    ],
  },
  {
    label: 'Мужчинам',
    value: 'men',
    children: [
      {
        label: 'Верхняя одежда',
        value: 'outerwear',
        children: [
          { label: 'пальто', value: 'coat' },
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
          { label: 'плащи', value: 'raincoats' },
        ],
      },
      {
        label: 'Брюки и джинсы',
        value: 'trousers_jeans',
        children: [
          { label: 'вечерние', value: 'evening' },
          { label: 'повседневные', value: 'casual' },
          { label: 'офисные', value: 'office' },
        ],
      },
      { label: 'Рубашки', value: 'shirts', children: [] },
      { label: 'Свитера', value: 'sweaters', children: [] },
      { label: 'Обувь', value: 'shoes', children: [] },
      { label: 'Аксессуары', value: 'accessories', children: [] },
    ],
  },
  {
    label: 'Для детей',
    value: 'children',
    children: [
      {
        label: 'Верхняя одежда',
        value: 'outerwear',
        children: [
          { label: 'куртки', value: 'jackets' },
          { label: 'пуховики', value: 'down_jackets' },
        ],
      },
      {
        label: 'Платья и юбки',
        value: 'dresses_skirts',
        children: [
          { label: 'вечерние', value: 'evening' },
          { label: 'повседневные', value: 'casual' },
          { label: 'офисные', value: 'office' },
          { label: 'юбки', value: 'skirts' },
        ],
      },
      { label: 'Брюки и джинсы', value: 'trousers_jeans', children: [] },
      { label: 'Блузы и рубашки', value: 'blouses_shirts', children: [] },
      {
        label: 'Свитера и кардиганы',
        value: 'sweaters_cardigans',
        children: [],
      },
      { label: 'Обувь', value: 'shoes', children: [] },
      { label: 'Аксессуары', value: 'accessories', children: [] },
    ],
  },
  {
    label: 'Для дома',
    value: 'home',
    children: [
      {
        label: 'Пижама',
        value: 'pajamas',
        children: [],
      },
      { label: 'Аксессуары', value: 'accessories', children: [] },
    ],
  },
];
