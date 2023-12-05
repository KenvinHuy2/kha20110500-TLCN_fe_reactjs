import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;

const selectCartFeature = (state) => state.shared;
export const cartSelectors = {
  selectProducts: createSelector(selectCartFeature, (state) => state.products),
};
