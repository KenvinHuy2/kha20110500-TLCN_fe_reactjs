import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      const existedProduct = state.products.find(
        (item) => item.productId === payload.productId && item.size === payload.size,
      );
      if (existedProduct) {
        existedProduct.amount += payload.amount;
      } else {
        state.products.push(payload);
      }
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;

const selectCartFeature = (state) => state.cart;
export const cartSelectors = {
  selectProducts: createSelector(selectCartFeature, (state) => state.products),
};
