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
    updateProductAmount: (state, { payload }) => {
      let productLine = state.products.find((item) => item._id === payload.lineId);
      if (productLine) {
        productLine.amount = payload.amount;
        productLine.totalPrice = payload.amount * productLine.price;
      }
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
