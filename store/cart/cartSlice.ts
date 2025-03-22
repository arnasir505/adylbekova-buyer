import { Product } from '@/types/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { CartState } from '@/types/cart';

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
};

const calculateTotals = (state: CartState) => {
  state.totalPrice = state.items.reduce((acc, cur) => {
    const discount = cur.product.discount || 0;
    const finalPrice = Math.max(cur.product.price - discount, 0);
    return acc + finalPrice * cur.quantity;
  }, 0);

  state.totalItems = state.items.reduce((acc, cur) => acc + cur.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload: product }: PayloadAction<Product>) => {
      const foundItem = state.items.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity++;
      } else {
        state.items.push({ product, quantity: 1 });
      }
      calculateTotals(state);
    },

    plusOneToCart: (state, { payload: product }: PayloadAction<Product>) => {
      const foundItem = state.items.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity++;
      }
      calculateTotals(state);
    },

    minusOneFromCart: (state, { payload: product }: PayloadAction<Product>) => {
      const foundIndex = state.items.findIndex(
        (item) => item.product._id === product._id
      );
      if (foundIndex !== -1) {
        state.items[foundIndex].quantity--;
        if (state.items[foundIndex].quantity === 0) {
          state.items.splice(foundIndex, 1);
        }
      }
      calculateTotals(state);
    },

    deleteFromCart: (state, { payload: product }: PayloadAction<Product>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== product._id
      );
      calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  minusOneFromCart,
  plusOneToCart,
  deleteFromCart,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsTotalPrice = (state: RootState) =>
  state.cart.totalPrice;
export const selectCartItemsTotal = (state: RootState) => state.cart.totalItems;
