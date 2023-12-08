import { createAsyncThunk } from '@reduxjs/toolkit';
import { sharedActions } from '../slices/shared.slice';
import { AlertService, CartsService, OrdersService } from '../../services';

export const getCartByUserId = createAsyncThunk(
  'cart/getCartByUserId',
  async (userId, { dispatch }) => {
    try {
      dispatch(sharedActions.showLoading());
      const cart = await CartsService.getCartByUserId(userId);
      return cart;
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
      return Promise.reject(null);
    } finally {
      dispatch(sharedActions.hideLoading());
    }
  },
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (payload, { dispatch }) => {
    try {
      dispatch(sharedActions.showLoading());
      const cart = await CartsService.updateCart(payload.userId, { products: payload.products });
      return cart;
    } catch (error) {
      AlertService.error(error?.response?.data?.message || error.message);
      return Promise.reject(null);
    } finally {
      dispatch(sharedActions.hideLoading());
    }
  },
);
