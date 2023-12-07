import { axiosClient } from '../interceptors';

export const CartsService = {
  getCartByUserId: async (userId) => {
    const { data } = await axiosClient.get(`/api/carts/users/${userId}`);
    return data.responseData;
  },
  updateCart: async (userId, payload) => {
    const { data } = await axiosClient.patch(`/api/carts/users/${userId}`, payload);
    return data.responseData;
  },
};
