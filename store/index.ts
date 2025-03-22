import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { cartReducer } from './cart/cartSlice';
import { CartState } from '@/types/cart';

const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined')
    return { items: [], totalItems: 0, totalPrice: 0 };

  const savedCart = localStorage.getItem('cart');
  return savedCart
    ? JSON.parse(savedCart)
    : { items: [], totalItems: 0, totalPrice: 0 };
};

const rootReducer = combineReducers({
  cart: cartReducer,
  [api.reducerPath]: api.reducer,
});

const preloadedState =
  typeof window !== 'undefined' ? { cart: loadCartFromStorage() } : undefined;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
