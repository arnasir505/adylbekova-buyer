import { z } from 'zod';
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  LIMIT,
  MAX_FILE_SIZE,
} from '@/lib/constants';

export const productFormSchema = z.object({
  images: z
    .unknown()
    .transform((value) => value as FileList)
    .optional()
    .or(z.literal(null))
    .refine((files) => !files || files.length < LIMIT, {
      message: `Нельзя прикрепить больше ${LIMIT} изображений`,
    })
    .refine(
      (files) =>
        !files || Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      {
        message: 'Максимальный размер изображения - 5MB',
      }
    )
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)
        ),
      {
        message: 'Допустимые форматы: .jpg, .jpeg, .png, .webp',
      }
    ),
  name: z.string().min(1, { message: 'Введите название' }),
  description: z.string().optional(),
  price: z.string().min(1, { message: 'Цена должна быть выше нуля' }),
  discount: z.string().optional(),
  material: z.string().optional(),
  brand: z.string().min(1, { message: 'Выберите бренд' }),
  category: z.string().min(1, { message: 'Выберите категорию' }),
  colors: z.string().array().min(1, { message: 'Выберите хотя бы один цвет' }),
  sizes: z.string().array().min(1, { message: 'Выберите хотя бы один размер' }),
});

export const brandFormSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .or(z.null())
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'Максимальный размер изображения - 5MB.',
    })
    .refine((file) => !file || ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), {
      message: 'Допустимые форматы: .jpg, .jpeg, .png, .webp.',
    }),
  name: z.string().min(1, { message: 'Введите название' }),
  description: z.string().optional(),
});

export const categoryFormSchema = z.object({
  label: z.string().min(1, { message: 'Введите название' }),
  name: z
    .string()
    .min(1, { message: 'Введите название на английском' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Используйте только латинские буквы, цифры и дефис',
    })
    .refine((val) => !val.includes(' '), {
      message: 'Используйте дефис вместо пробела',
    }),
});

export const colorFormSchema = z.object({
  name: z.string().min(1, { message: 'Введите название цвета' }),
  hex: z.string().min(1, { message: 'Выберите цвет' }),
});

export const sizeFormSchema = z.object({
  value: z.string().min(1, { message: 'Введите размер' }),
});

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Введите email' })
    .email('Некорректный email'),
  password: z.string().min(1, { message: 'Введите пароль' }),
});

export const userFormSchema = z.object({
  name: z.string().min(1, { message: 'Введите имя' }),
  email: z
    .string()
    .min(1, { message: 'Введите email' })
    .email('Некорректный email'),
  password: z.string().min(5, { message: 'Введите пароль (минимум 5 символов)' }),
  phone: z.string().min(1, { message: 'Введите номер телефона' }),
});

export const orderFormSchema = z.object({
  firstName: z.string().min(1, { message: 'Введите имя.' }).max(50),
  email: z
    .string()
    .min(1, { message: 'Введите email.' })
    .email({ message: 'Неверный email.' }),
  country: z.string().min(1, { message: 'Выберите страну.' }),
  city: z.string().min(1, { message: 'Введите город.' }),
  address: z.string().min(1, { message: 'Введите адрес.' }),
  phone: z.string().min(1, { message: 'Введите номер.' }),
  orderDetails: z
    .string()
    .max(400, { message: 'Превышено максимальное количество символов.' }),
});
