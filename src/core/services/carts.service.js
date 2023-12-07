import { axiosClient } from '../interceptors';

export const CartsService = {
  getCart: async (userId) => {
    const { data } = await axiosClient.get(`/api/carts/users/${userId}`);
    return data.responseData;
  },
};
