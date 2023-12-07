import { createSelector, createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './../async-actions';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncActions.getCartByUserId.fulfilled, (state, { payload }) => {
      state.products = payload.products;
    });
    builder.addCase(asyncActions.addProductToCart.fulfilled, (state, { payload }) => {
      state.products = payload.products;
    });
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;

const selectCartFeature = (state) => state.cart;
export const cartSelectors = {
  selectProducts: createSelector(selectCartFeature, (state) => state.products),
};
